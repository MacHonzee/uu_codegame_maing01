"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SolvingSessionsMongo extends UuObjectDao {

  async createSchema() {
    // FIXME JR: chybí Ti tu indexy
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async update(uuObject) {
    // FIXME JR: fuj překlep
    let filter = {
      sovler: uuObject.sovler,
      assignmentId: uuObject.assignmentId
    };

    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async getAll() {
    return await super.find({});
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
