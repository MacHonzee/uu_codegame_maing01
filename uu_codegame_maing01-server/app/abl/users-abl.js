"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/users-error.js");
const LocalValidaionHelper = require("../components/Local-validation-helper");

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

  async getUser(uri, dtoIn) {
    let uuAppErrorMap = LocalValidaionHelper.validate(uri, dtoIn);

    let dtoOut = { uuAppErrorMap };
    try {
      let user = await this.dao.getOne(dtoIn.userId);
      dtoOut.user = user;
    } catch (e) {
      throw new Errors.GetUser.InvalidDtoIn({cause : e});
    }

    return dtoOut;
  }

  async addUser(uri, dtoIn) {
    let uuAppErrorMap = LocalValidaionHelper.validate(uri, dtoIn);

    try {
      await this.dao.create(dtoIn);
    } catch (e) {
    }

    let dtoOut = { user: dtoIn, uuAppErrorMap };

    return dtoOut;
  }

}

module.exports = new UsersAbl();
