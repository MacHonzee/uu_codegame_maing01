/* eslint-disable */

const addUserDtoInType = shape({
  userId: string().isRequired(),
  completedParts: array(string()).isRequired()
});

const getUserDtoInType = shape({
  userId: string().isRequired()
});
