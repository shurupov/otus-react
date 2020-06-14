import { createStore } from "redux";

const reducer = (state: unknown) => {
  return state;
};

export const getStore = () => {
  return createStore(reducer);
};
