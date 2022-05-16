class generator {

  getInput() {
    let input = [];

    for (let i = 0; i < 40; i++) {
      input.push(Math.round(Math.random() * 10));
    }

    return input;
  }

  validateInput(originalInput, usersAnswer) {

    try {
      originalInput = JSON.parse(originalInput);

      let expectedSolution = originalInput.filter(x => (x % 2 === 1)).sort((a, b) => b - a)[0];

      return expectedSolution === parseInt(usersAnswer);

    } catch {
      return false;
    }
  }
}

module.exports = new generator();
