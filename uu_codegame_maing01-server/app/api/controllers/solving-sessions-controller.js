"use strict";
const SolvingSessionsAbl = require("../../abl/solving-sessions-abl.js");

class SolvingSessionsController {

  calculateUserDifficulty(ucEnv) {
    return SolvingSessionsAbl.calculateUserDifficulty(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  updateRating(ucEnv) {
    return SolvingSessionsAbl.updateRating(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  getSession(ucEnv) {
    return SolvingSessionsAbl.getSession(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  validateResult(ucEnv) {
    return SolvingSessionsAbl.validateResult(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  getInput(ucEnv) {
    return SolvingSessionsAbl.getInput(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  updateSolvingSession(ucEnv) {
    return SolvingSessionsAbl.updateSolvingSession(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  createSolvingSession(ucEnv) {
    return SolvingSessionsAbl.createSolvingSession(ucEnv.getUri(), ucEnv.getDtoIn());
  }

}

module.exports = new SolvingSessionsController();
