"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class AssignmentsMongo extends UuObjectDao {

  async createSchema() {
    // FIXME JR: chybí Ti tu indexy, minimálně na awid to pak bude potřeba
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async getAll() {
    return await super.find({});
  }

  async getOne(id) {
    let filter = {
      id
    };

    return await super.findOne(filter);
  }

}

module.exports = AssignmentsMongo;
