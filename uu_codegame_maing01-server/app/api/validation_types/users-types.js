/* eslint-disable */

const userDtoIn = shape({
  userId: string().isRequired(),
  completedParts: array(string()).isRequired()
});
