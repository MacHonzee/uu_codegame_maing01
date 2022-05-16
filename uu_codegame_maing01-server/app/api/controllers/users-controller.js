"use strict";
const UsersAbl = require("../../abl/users-abl.js");

class UsersController {

  getUser(ucEnv) {
    return UsersAbl.getUser(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  addUser(ucEnv) {
    return UsersAbl.addUser(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new UsersController();
