import { Reducer } from "redux";

export const reducer: Reducer = (state = {}, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: "",
        person: null,
      };
    case "UPDATE_PERSON":
      return {
        ...state,
        person: action.payload,
        loading: false,
        error: false,
        errorMessage: "",
      };
    case "UPDATE_PERSON_ERROR":
      return {
        ...state,
        error: true,
        errorMessage: (action.payload as Error).message,
        loading: false,
        person: null,
      };
    default:
      return state;
  }
};
