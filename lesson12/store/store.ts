import { createStore, Store } from "redux";
import { reducer } from "store/reducer";
import { ControlsState } from "components/App/Main/ConwayLifeApp/ControlsForm/ControlsForm";

const defaultState: ControlsState = {
  fieldWidth: 50,
  fieldHeight: 50,
  cellSize: 10,
  animationDelay: 50,
  alivePercent: 30,
  animationStepsCount: 4,
};

export const store: Store = createStore(
  reducer,
  defaultState,
  // https://github.com/zalmoxisus/redux-devtools-extension
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
