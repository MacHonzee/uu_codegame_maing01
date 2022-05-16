class generator {

  getInput() {
    const input = "Edge length: " + Math.round(Math.random() * 10);
    return input;
  }

  validateInput(originalInput, usersAnswer) {

    try {
      originalInput = originalInput.split(":")[1].trim();

      let expectedSolution = parseInt(originalInput) * parseInt(originalInput);

      return expectedSolution === parseInt(usersAnswer);

    } catch {
      return false;
    }
  }
}

module.exports = new generator();
