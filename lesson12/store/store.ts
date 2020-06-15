import { createStore, Store } from "redux";
import { defaultState, reducer } from "store/reducer";

export interface StoreState {
  fieldWidth: number;
  fieldHeight: number;
  cellSize: number;
  animationDelay: number;
  alivePercent: number;
  animationStepsCount: number;
  reinitField: boolean;
}

export const store: Store<StoreState> = createStore(
  reducer,
  defaultState,
  // https://github.com/zalmoxisus/redux-devtools-extension
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
