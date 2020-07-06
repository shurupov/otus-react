import { createStore, Store } from "redux";
import { reducer } from "store/reducer";
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

export interface UserStore {
  username: string;
}

export const store: Store = createStore(reducer, composeWithDevTools());
