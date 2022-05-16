"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SolvingSessionsMongo extends UuObjectDao {

  async createSchema() {
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async update(uuObject) {
    let filter = {
      sovler: uuObject.sovler,
      assignmentId: uuObject.assignmentId
    };

    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async getOne(solver, assignmentId) {
    let filter = {
      solver,
      assignmentId
    };

    return await super.findOne(filter);
  }
}

module.exports = SolvingSessionsMongo;
