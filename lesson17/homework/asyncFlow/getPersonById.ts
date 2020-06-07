import { Store } from "redux";
import {
  loadingAction,
  updatePersonAction,
  updatePersonErrorAction,
} from "./actionCreators";

export const getPersonById = (store: Store) => (id: number) => {
  store.dispatch(loadingAction());
  return fetch(`https://swapi.dev/api/people/${id}`)
    .then((response) => response.json())
    .then((person) => store.dispatch(updatePersonAction(person)))
    .catch((error) => store.dispatch(updatePersonErrorAction(error)));
};
