"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/assignments-error.js");
const crypto = require("node:crypto");
const LocalValidaionHelper = require("../components/Local-validation-helper");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.CreateAssignment.UC_CODE}unsupportedKeys`,
  },
  getFullAssignmentUnsupportedKeys: {
    code: `${Errors.GetFullAssignment.UC_CODE}unsupportedKeys`,
  }
};

class AssignmentsAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("assignments");
  }

  async getFullAssignment(uri, dtoIn) {
   let uuAppErrorMap = LocalValidaionHelper.validate(uri, dtoIn);

    let dtoOut = { uuAppErrorMap };

    try {
      let fullAssignment = await this.dao.getOne(dtoIn.id);

      let usersStats = await DaoFactory.getDao("users").getOne(dtoIn.userId);

      let partsToShow = [];
      fullAssignment.partsCo = fullAssignment.parts.length;

      for (let index in fullAssignment.parts) {

        if (parseInt(index) === 0) {
          partsToShow.push(fullAssignment.parts[index]);
          continue;
        }

        if (!usersStats.completedParts.includes(fullAssignment.parts[index - 1].id)) {
          break;
        }

        partsToShow.push(fullAssignment.parts[index]);
      }

      fullAssignment.parts = partsToShow;
      dtoOut.assignment = fullAssignment;

    } catch (e) {
      throw e;
    }

    return dtoOut;
  }

  async getAssignments(uri, dtoIn) {
    let assignments = {};

    try {
      assignments = await this.dao.getAll();
    } catch (e) {
      return e;
    }

    let dtoOut = assignments.itemList;

    return dtoOut;
  }

  async createAssignment(uri, dtoIn) {
    let uuAppErrorMap = LocalValidaionHelper.validate(uri, dtoIn);

    dtoIn.parts = dtoIn.parts.map(x => {
      return {
        ...x,
        id: crypto.randomUUID()
      };
    });

    try {
      await this.dao.create(dtoIn);
    } catch (e) {
      throw e;
    }

    let dtoOut = {
      assignment: { ...dtoIn },
      uuAppErrorMap
    };

    return dtoOut;
  }

}

module.exports = new AssignmentsAbl();
