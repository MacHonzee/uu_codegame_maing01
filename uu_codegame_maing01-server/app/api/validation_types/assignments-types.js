/* eslint-disable */

const assignmentDtoIn = shape({
  name: string().isRequired(),
  parts: array(shape({
    description: string().isRequired(),
    input: string().isRequired(),
  })).isRequired(),
  difficulty: number().isRequired()
});

const getAssignmentDtoIn = shape({
  id: string().isRequired(),
  userId : string().isRequired()
});
