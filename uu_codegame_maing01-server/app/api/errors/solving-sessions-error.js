"use strict";

const CodegameMainUseCaseError = require("./codegame-main-use-case-error.js");
const SOLVING_SESSIONS_ERROR_PREFIX = `${CodegameMainUseCaseError.ERROR_PREFIX}solvingSessions/`;

const CreateSolvingSession = {
  UC_CODE: `${SOLVING_SESSIONS_ERROR_PREFIX}createSolvingSession/`,
  InvalidDtoIn: class extends CodegameMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateSolvingSession.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const UpdateSolvingSession = {
  UC_CODE: `${SOLVING_SESSIONS_ERROR_PREFIX}updateSolvingSession/`,
  InvalidDtoIn: class extends CodegameMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateSolvingSession.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const GetInput = {
  UC_CODE: `${SOLVING_SESSIONS_ERROR_PREFIX}getInput/`,
  InvalidDtoIn: class extends CodegameMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetInput.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const ValidateResult = {
  UC_CODE: `${SOLVING_SESSIONS_ERROR_PREFIX}validateResult/`,
  InvalidDtoIn: class extends CodegameMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ValidateResult.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const GetSession = {
  UC_CODE: `${SOLVING_SESSIONS_ERROR_PREFIX}getSession/`,
  InvalidDtoIn: class extends CodegameMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetSession.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const UpdateRating = {
  UC_CODE: `${SOLVING_SESSIONS_ERROR_PREFIX}updateRating/`,
  InvalidDtoIn: class extends CodegameMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateRating.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const CalculateUserDifficulty = {
  UC_CODE: `${SOLVING_SESSIONS_ERROR_PREFIX}calculateUserDifficulty/`,
  
};

module.exports = {
  CalculateUserDifficulty,
  UpdateRating,
  GetSession,
  ValidateResult,
  GetInput,
  UpdateSolvingSession,
  CreateSolvingSession
};
