import { Store } from "redux";
import {
  loadingAction,
  updatePersonAction,
  updatePersonErrorAction,
} from "./actionCreators";

export const getPersonByIdThunk = (store: Store) => (id: number) => {
  store.dispatch(loadingAction());
  return fetch(`https://swapi.dev/api/people/${id}`)
    .then((response: Response) => response.json())
    .then((person: any) => store.dispatch(updatePersonAction(person)))
    .catch((error: Error) => store.dispatch(updatePersonErrorAction(error)));
};
