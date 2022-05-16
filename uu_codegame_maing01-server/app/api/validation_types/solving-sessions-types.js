/* eslint-disable */

const sessionDtoIn = shape({

  solver: string().isRequired(),
  solverName: string().isRequired(),
  assignmentId: string().isRequired(),
  input: string().isRequired(),
  solution: string().isRequired(),
  solutionTimestamp: string().isRequired(),
  result: oneOf(["valid", "invalid", "notFilled"]).isRequired(),
  difficulty: number().isRequired(),

});

const getInputDtoIn = shape({
  solver: string().isRequired(),
  assignmentId: string().isRequired(),
  inputScriptPath: string().isRequired()
});

const validateResultDtoIn = shape({
  solver: string().isRequired(),
  assignmentId: string().isRequired(),
  inputScriptPath: string().isRequired(),
  usersAnswer : string().isRequired(),
  originalInput : string().isRequired()
});

const getSolvingSessionDtoIn = shape({
  solver: string().isRequired(),
  assignmentId: string().isRequired()
});
