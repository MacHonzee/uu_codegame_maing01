"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/users-error.js");

const WARNINGS = {
  addUserUnsupportedKeys: {
    code: `${Errors.AddUser.UC_CODE}unsupportedKeys`,
  },
  getUserUnsupportedKeys: {
    code: `${Errors.GetUser.UC_CODE}unsupportedKeys`,
  },
};

class UsersAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("users");
  }

  async getUser(awid, dtoIn) {
    let validationResult = this.validator.validate("getUserDtoIn", dtoIn);
    let uuAppErrorMap = {};

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.getUserUnsupportedKeys,
      Errors.AddUser.InvalidDtoIn
    );

    let dtoOut = { uuAppErrorMap };
    try {
      let user = await this.dao.getOne(dtoIn.userId);
      dtoOut.user = user;
    } catch (e) {
      throw  e;
    }

    return dtoOut;
  }

  async addUser(awid, dtoIn) {
    let validationResult = this.validator.validate("userDtoIn", dtoIn);
    let uuAppErrorMap = {};

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.addUserUnsupportedKeys,
      Errors.GetUser.InvalidDtoIn
    );

    try {
      await this.dao.create(dtoIn);
    } catch (e) {
      return e
    }

    let dtoOut = { user: dtoIn, uuAppErrorMap };

    return dtoOut;
  }

}

module.exports = new UsersAbl();
