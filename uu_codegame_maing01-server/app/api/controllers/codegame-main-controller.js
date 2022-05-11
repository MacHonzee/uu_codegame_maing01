"use strict";
const CodegameMainAbl = require("../../abl/codegame-main-abl.js");

class CodegameMainController {
  init(ucEnv) {
    return CodegameMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new CodegameMainController();
