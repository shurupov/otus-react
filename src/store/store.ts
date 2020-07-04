import { applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { reducer } from "store/reducer";
import { configureStore } from "@reduxjs/toolkit";
import { watchSagaChangeSettings } from "store/sagas";
import { composeWithDevTools } from "redux-devtools-extension";

export interface StoreState {
  username: string;
  fieldWidth: number;
  fieldHeight: number;
  cellSize: number;
  animationDelay: number;
  alivePercent: number;
  animationStepsCount: number;
  reinitField: boolean;
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
