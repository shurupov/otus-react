import { Store } from "redux";
import { reducer } from "store/reducer";
import { configureStore } from "@reduxjs/toolkit";
import { logMiddleware } from "store/logMiddleware";

export interface StoreState {
  fieldWidth: number;
  fieldHeight: number;
  cellSize: number;
  animationDelay: number;
  alivePercent: number;
  animationStepsCount: number;
  reinitField: boolean;
}

export const store: Store<StoreState> = configureStore({
  reducer,
  middleware: [logMiddleware],
});