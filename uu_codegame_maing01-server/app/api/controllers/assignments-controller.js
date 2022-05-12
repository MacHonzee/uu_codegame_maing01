"use strict";
const AssignmentsAbl = require("../../abl/assignments-abl.js");

class AssignmentsController {

  getFullAssignment(ucEnv) {
    return AssignmentsAbl.getFullAssignment(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  getAssignments(ucEnv) {
    return AssignmentsAbl.getAssignments(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  createAssignment(ucEnv) {
    return AssignmentsAbl.createAssignment(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new AssignmentsController();
