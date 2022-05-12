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
};

class UsersAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("users");
  }

  async addUser(awid, dtoIn) {
    let validationResult = this.validator.validate("userDtoIn", dtoIn);
    let uuAppErrorMap = {};

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.addUserUnsupportedKeys,
      Errors.AddUser.InvalidDtoIn
    );

    try {
      await this.dao.create(dtoIn);
    } catch (e) {
      return e
    }

    let dtoOut = {user : dtoIn, uuAppErrorMap};

    return dtoOut;
  }

}

module.exports = new UsersAbl();
