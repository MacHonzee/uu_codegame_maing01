const isNumber = require("../Tools/NumberCheck");

class generator {

  getInput() {
    const input = Math.round(Math.random() * 10) + "," + Math.round(Math.random() * 10);

    return input;
  }

  validateInput(originalInput, usersAnswer) {

    try {
      const parts = originalInput.split(",");

      let base = parts[0];
      let height = parts[1];

      if (!isNumber(base) || !isNumber(height)) return false;

      let expectedSolution = (base * height) / 2;
      return expectedSolution === parseInt(usersAnswer);

    } catch {
      return false;
    }
  }
}

module.exports = new generator();
