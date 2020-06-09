export const loadingAction = () => {
  return { type: "LOADING" };
};

export const updatePersonAction = (person: unknown) => {
  return { type: "UPDATE_PERSON", payload: person };
};

export const updatePersonErrorAction = (error: Error) => {
  return { type: "UPDATE_PERSON_ERROR", payload: error };
};
