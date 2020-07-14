import { Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { reducer } from "store/reducer";
import { configureStore } from "@reduxjs/toolkit";
import { watchSagaChangeSettings } from "store/sagas";

export interface StoreState {
  fieldWidth: number;
  fieldHeight: number;
  cellSize: number;
  animationDelay: number;
  alivePercent: number;
  animationStepsCount: number;
  reinitField: boolean;
}

const sagaMiddleware = createSagaMiddleware();

export const store: Store<StoreState> = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(watchSagaChangeSettings);
