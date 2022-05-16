class generator {

  getInput() {
    const input = "Circle radius: " + Math.round(Math.random() * 10);
    return input;
  }

  validateInput(originalInput, usersAnswer) {

    try {
      originalInput = originalInput.split(":")[1].trim();

      let expectedSolution = Math.round(Math.PI * parseInt(originalInput) * parseInt(originalInput));

      return expectedSolution === parseInt(usersAnswer);

    } catch {
      return false;
    }
  }
}

module.exports = new generator();
