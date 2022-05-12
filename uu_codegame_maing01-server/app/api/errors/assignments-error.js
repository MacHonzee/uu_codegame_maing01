"use strict";

const CodegameMainUseCaseError = require("./codegame-main-use-case-error.js");
const ASSIGNMENTS_ERROR_PREFIX = `${CodegameMainUseCaseError.ERROR_PREFIX}assignments/`;

const CreateAssignment = {
  UC_CODE: `${ASSIGNMENTS_ERROR_PREFIX}createAssignment/`,
  InvalidDtoIn: class extends CodegameMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateAssignment.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }

  }
};

const GetAssignments = {
  UC_CODE: `${ASSIGNMENTS_ERROR_PREFIX}getAssignments/`,

};

const GetFullAssignment = {
  UC_CODE: `${ASSIGNMENTS_ERROR_PREFIX}getFullAssignment/`,
  InvalidDtoIn: class extends CodegameMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetFullAssignment.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }

  };

module.exports = {
  GetFullAssignment,
  GetAssignments,
  CreateAssignment
};
