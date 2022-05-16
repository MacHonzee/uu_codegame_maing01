class generator {

  getInput() {
    const input = "Triangle info: Base length: {" + Math.round(Math.random() * 10)
      + "} Height length: (" + Math.round(Math.random() * 10) + ")";

    return input;
  }

  validateInput(originalInput, usersAnswer) {

    try {
      let base = originalInput.substring(originalInput.indexOf("{") + 1, originalInput.indexOf("}"));
      let height = originalInput.substring(originalInput.indexOf("(") + 1, originalInput.indexOf(")"));

      base = parseInt(base);
      height = parseInt(height);

      let expectedSolution = (base * height) / 2;

      return expectedSolution === parseInt(usersAnswer);

    } catch {
      return false;
    }
  }
}

module.exports = new generator();
