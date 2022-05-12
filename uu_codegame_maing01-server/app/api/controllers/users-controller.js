"use strict";
const UsersAbl = require("../../abl/users-abl.js");

class UsersController {

  addUser(ucEnv) {
    return UsersAbl.addUser(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new UsersController();
