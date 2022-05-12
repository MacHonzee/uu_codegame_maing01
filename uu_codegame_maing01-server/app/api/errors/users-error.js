"use strict";

const CodegameMainUseCaseError = require("./codegame-main-use-case-error.js");
const USERS_ERROR_PREFIX = `${CodegameMainUseCaseError.ERROR_PREFIX}users/`;

const AddUser = {
  UC_CODE: `${USERS_ERROR_PREFIX}addUser/`,
  InvalidDtoIn: class extends CodegameMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddUser.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

module.exports = {
  AddUser
};
