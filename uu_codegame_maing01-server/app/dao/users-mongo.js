"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class UsersMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({ userId: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async getOne(userId) {
    let filter = {
      userId
    };

    return await super.findOne(filter);
  }

  async updateOne(uuObject) {
    let filter = {
      userId: uuObject.userId
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

}

module.exports = UsersMongo;
