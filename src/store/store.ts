import { applyMiddleware, createStore, Store } from "redux";
import { reducer } from "store/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { watchSagaLogin, watchSagaLogout } from "smart/User/saga";
import {
  reinitAction,
  watchSagaChangeSetting,
  watchSagaInit,
  watchSagaUpdate,
} from "smart/ConwayLife/saga";

export interface ConwaySettings {
  fieldWidth: number;
  fieldHeight: number;
  cellSize: number;
  animationDelay: number;
  alivePercent: number;
  animationStepsCount: number;
}

export interface UserStore {
  id: number | null;
  username: string;
  first: string;
  last: string;
}

const sagaMiddleware = createSagaMiddleware();

export const store: Store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(watchSagaLogin);
sagaMiddleware.run(watchSagaLogout);
sagaMiddleware.run(watchSagaUpdate);
sagaMiddleware.run(watchSagaInit);
sagaMiddleware.run(watchSagaChangeSetting);
store.dispatch(reinitAction());
