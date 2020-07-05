import { applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { reducer } from "store/reducer";
import { watchSagaChangeSettings } from "store/sagas";
import { composeWithDevTools } from "redux-devtools-extension";

export interface ConwaySettings {
  fieldWidth: number;
  fieldHeight: number;
  cellSize: number;
  animationDelay: number;
  alivePercent: number;
  animationStepsCount: number;
  reinitField: boolean;
  initialized: boolean;
}

export interface StoreState {
  conwaySettings: ConwaySettings;
  username: string;
}

const sagaMiddleware = createSagaMiddleware();

export const store: Store<StoreState> = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
    // other store enhancers if any
  )
);
sagaMiddleware.run(watchSagaChangeSettings);
