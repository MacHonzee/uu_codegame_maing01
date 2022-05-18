const isNumber = require("../Tools/NumberCheck");

class generator {

  getInput() {
    const input = Math.round(Math.random() * 10);
    return input;
  }

  validateInput(originalInput, usersAnswer) {

    try {
      if (!isNumber(usersAnswer) || !isNumber(originalInput)) return false;

      let expectedSolution = Math.round(Math.PI * originalInput * originalInput);

      return expectedSolution === parseInt(usersAnswer);

    } catch {
      return false;
    }
  }
}

module.exports = new generator();
