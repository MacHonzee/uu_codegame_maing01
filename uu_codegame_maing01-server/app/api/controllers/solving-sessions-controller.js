"use strict";
const SolvingSessionsAbl = require("../../abl/solving-sessions-abl.js");

class SolvingSessionsController {

  calculateUserDifficulty(ucEnv) {
    return SolvingSessionsAbl.calculateUserDifficulty(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  updateRating(ucEnv) {
    return SolvingSessionsAbl.updateRating(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  getSession(ucEnv) {
    return SolvingSessionsAbl.getSession(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  validateResult(ucEnv) {
    return SolvingSessionsAbl.validateResult(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  getInput(ucEnv) {
    return SolvingSessionsAbl.getInput(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  updateSolvingSession(ucEnv) {
    return SolvingSessionsAbl.updateSolvingSession(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  createSolvingSession(ucEnv) {
    return SolvingSessionsAbl.createSolvingSession(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new SolvingSessionsController();
