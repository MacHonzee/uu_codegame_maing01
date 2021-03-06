/* eslint-disable */

const createAssignmentDtoInType = shape({
  name: string().isRequired(),
  parts: array(shape({
    description: string().isRequired(),
    input: string().isRequired(),
  })).isRequired(),
  difficulty: number().isRequired()
});

const getFullAssignmentDtoInType = shape({
  id: string().isRequired(),
  userId : string().isRequired()
});
