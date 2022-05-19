const isNumber = require("../Tools/NumberCheck");

// FIXME JR: nějaké standardy
// 1) složky se pojmenovávají s malým písmenem na začátku
// 2) a třídy naopak s velkým, takže class Generator
class generator {

  getInput() {
    const input = Math.round(Math.random() * 10);
    return input;
  }

  validateInput(originalInput, usersAnswer) {
    try {

      if (!isNumber(usersAnswer) || !isNumber(originalInput)) return false;

      let expectedSolution = Math.pow(originalInput, 2);

      return expectedSolution === parseInt(usersAnswer);

    } catch {
      return false;
    }
  }
}

module.exports = new generator();
