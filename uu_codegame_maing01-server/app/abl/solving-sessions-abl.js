"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/solving-sessions-error.js");

const WARNINGS = {
  createSolvingSessionUnsupportedKeys: {
    code: `${Errors.CreateSolvingSession.UC_CODE}unsupportedKeys`,
  },
  updateSolvingSessionUnsupportedKeys: {
    code: `${Errors.UpdateSolvingSession.UC_CODE}unsupportedKeys`,
  },
  getInputUnsupportedKeys: {
    code: `${Errors.GetInput.UC_CODE}unsupportedKeys`,
  },
  validateResultUnsupportedKeys: {
    code: `${Errors.ValidateResult.UC_CODE}unsupportedKeys`,
  },
  getSolvingSessionUnsupportedKeys: {
    code: `${Errors.GetSession.UC_CODE}unsupportedKeys`,
  },
  updateRatingSessionUnsupportedKeys: {
    code: `${Errors.UpdateSolvingSession.UC_CODE}unsupportedKeys`,
  },
};

class SolvingSessionsAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("solvingSessions");
  }

  async calculateUserDifficulty(awid, dtoIn) {

    try {

      let allAssignments = (await DaoFactory.getDao("assignments").getAll()).itemList;
      allAssignments = allAssignments.map(assignment => {
        assignment.parts = assignment.parts.map(part => part.id);
        return assignment;
      });

      let allSessions = (await this.dao.getAll()).itemList;
      allSessions = allSessions.filter(ses => ses.difficulty !== 0);

      let assignmentRatings = [];

      for (let assignment of allAssignments) {
        let includedParts = allSessions.filter(ses => assignment.parts.includes(ses.assignmentId));
        let averageDifficulty = includedParts.reduce((total, item) => total + item.difficulty, 0) / includedParts.length;

        assignmentRatings.push({
          assignmentId: assignment.id,
          difficulty: Math.round(averageDifficulty)
        });
      }

      return assignmentRatings;

    } catch (e) {
      throw e;
    }

  }

  async updateRating(awid, dtoIn) {
    let validationResult = this.validator.validate("updateSessionRatingDtoIn", dtoIn);
    let uuAppErrorMap = {};

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.updateRatingSessionUnsupportedKeys,
      Errors.UpdateRating.InvalidDtoIn
    );

    try {
      await this.dao.update(dtoIn);
    } catch (e) {
      throw  e;
    }

    const dtoOut = { ...dtoIn, uuAppErrorMap };

    return dtoOut;
  }

  async getSession(awid, dtoIn) {
    let validationResult = this.validator.validate("getSolvingSessionDtoIn", dtoIn);
    let uuAppErrorMap = {};

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.getSolvingSessionUnsupportedKeys,
      Errors.GetSession.InvalidDtoIn
    );

    let dtoOut = { uuAppErrorMap };

    try {
      dtoOut.session = await this.dao.getOne(dtoIn.solver, dtoIn.assignmentId);
    } catch (e) {
      throw e;
    }

    return dtoOut;
  }

  async validateResult(awid, dtoIn) {
    let validationResult = this.validator.validate("validateResultDtoIn", dtoIn);
    let uuAppErrorMap = {};

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.validateResultUnsupportedKeys,
      Errors.ValidateResult.InvalidDtoIn
    );

    let inputValid = false;

    try {
      let generatorScript = require(dtoIn.inputScriptPath);
      inputValid = generatorScript.validateInput(dtoIn.originalInput, dtoIn.usersAnswer);

      let updatedValue = {
        solver: dtoIn.solver,
        assignmentId: dtoIn.assignmentId,
      };

      if (inputValid) {
        updatedValue.result = "valid";
        let currentlyCompleted = (await DaoFactory.getDao("users").getOne(dtoIn.solver)).completedParts;
        if (!currentlyCompleted.includes(dtoIn.assignmentId)) currentlyCompleted.push(dtoIn.assignmentId);

        await DaoFactory.getDao("users").updateOne({
          userId: dtoIn.solver,
          completedParts: currentlyCompleted
        });
      } else {
        updatedValue.result = "invalid";
      }

      await this.dao.update(updatedValue);

    } catch (e) {
      throw e.message;
    }

    return { inputValid, uuAppErrorMap };

  }

  async getInput(awid, dtoIn) {
    let validationResult = this.validator.validate("getInputDtoIn", dtoIn);
    let uuAppErrorMap = {};

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.getInputUnsupportedKeys,
      Errors.GetInput.InvalidDtoIn
    );

    let generatedInput = {};

    try {
      let generatorScript = require(dtoIn.inputScriptPath);
      generatedInput = JSON.stringify(generatorScript.getInput());

      this.dao.update({
        solver: dtoIn.solver,
        assignmentId: dtoIn.assignmentId,
        input: generatedInput
      });
    } catch (e) {
      throw new Errors.GetSession.InvalidDtoIn({ cause: e });
    }

    return { generatedInput, uuAppErrorMap };

  }

  async updateSolvingSession(awid, dtoIn) {
    let validationResult = this.validator.validate("sessionDtoIn", dtoIn);
    let uuAppErrorMap = {};

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.updateSolvingSessionUnsupportedKeys,
      Errors.UpdateSolvingSession.InvalidDtoIn
    );

    try {
      await this.dao.update(dtoIn);
    } catch (e) {
      throw e.message;
    }
  }

  async createSolvingSession(awid, dtoIn) {
    let validationResult = this.validator.validate("sessionDtoIn", dtoIn);
    let uuAppErrorMap = {};

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.createSolvingSessionUnsupportedKeys,
      Errors.CreateSolvingSession.InvalidDtoIn
    );

    let foundSession = {};

    try {
      foundSession = await this.dao.getOne(dtoIn.solver, dtoIn.assignmentId);

      if (foundSession === null) {
        foundSession = await this.dao.create(dtoIn);
      }

    } catch (e) {
      throw e.message;
    }

    let dtoOut = { session: foundSession, uuAppErrorMap };

    return dtoOut;
  }

}

module.exports = new SolvingSessionsAbl();
