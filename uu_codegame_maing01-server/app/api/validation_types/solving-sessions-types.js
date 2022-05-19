/* eslint-disable */

const createSolvingSessionDtoInType = shape({
  // FIXME JR: solver by spíš mělo být uuIdentity() validace
  // FIXME JR: je tu teda hoodně věcí required, skutečně to je potřeba?
  solver: string().isRequired(),
  solverName: string().isRequired(),
  assignmentId: string().isRequired(),
  input: string().isRequired(),
  solution: string().isRequired(),
  solutionTimestamp: string().isRequired(),
  result: oneOf(["valid", "invalid", "notFilled"]).isRequired(),
  difficulty: number().isRequired(),

});

const updateSolvingSessionDtoInType = createSolvingSessionDtoInType;

const getInputDtoInType = shape({
  solver: string().isRequired(),
  assignmentId: string().isRequired(),
  inputScriptPath: string().isRequired()
});

const validateResultDtoInType = shape({
  solver: string().isRequired(),
  assignmentId: string().isRequired(),
  inputScriptPath: string().isRequired(),
  usersAnswer: string().isRequired(),
  originalInput: string().isRequired()
});

const getSessionDtoInType = shape({
  solver: string().isRequired(),
  assignmentId: string().isRequired()
});

const updateRatingDtoInType = shape({
  solver: string().isRequired(),
  assignmentId: string().isRequired(),
  difficulty: number().isRequired()
});
