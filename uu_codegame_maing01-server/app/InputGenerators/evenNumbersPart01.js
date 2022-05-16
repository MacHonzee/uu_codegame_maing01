class generator {

  getInput() {
    let input = [];

    for (let i = 0; i < 10; i++) {
      input.push(Math.round(Math.random() * 10));
    }

    return input;
  }

  validateInput(originalInput, usersAnswer) {

    try {
      originalInput = JSON.parse(originalInput);

      let expectedSolution = originalInput.filter(x => (x % 2 === 0)).sort((a, b) => a - b)[0];

      return expectedSolution === parseInt(usersAnswer);

    } catch {
      return false;
    }
  }
}

module.exports = new generator();
