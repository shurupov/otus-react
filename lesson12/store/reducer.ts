import { StoreState } from "store/store";
import { createReducer } from "@reduxjs/toolkit";
import { Reducer } from "redux";

export const actionTypes = {
  INIT_FIELD: "INIT_FIELD",
  INIT_FIELD_PERFORMED: "INIT_FIELD_PERFORMED",
  CHANGE_SETTING: "CHANGE_SETTING",
};

export interface ConwayLifeAction {
  type: string;
  payload?: {
    field: string;
    value: number;
  };
}

export const defaultState: StoreState = {
  fieldWidth: 50,
  fieldHeight: 50,
  cellSize: 10,
  animationDelay: 50,
  alivePercent: 30,
  animationStepsCount: 4,
  reinitField: false,
};

export const reducer: Reducer<StoreState> = createReducer(defaultState, {
  [actionTypes.INIT_FIELD]: (state: StoreState) => {
    state.reinitField = true;
    return state;
  },
  [actionTypes.INIT_FIELD_PERFORMED]: (state) => {
    state.reinitField = false;
    return state;
  },
  [actionTypes.CHANGE_SETTING]: (
    state: StoreState,
    action: ConwayLifeAction
  ) => {
    if (!action.payload || !action.payload.value) {
      return state;
    }
    if (action.payload.field) {
      const fieldName = action.payload.field;
      state[fieldName] = action.payload.value;
      state.reinitField =
        fieldName === "fieldHeight" ||
        fieldName === "fieldWidth" ||
        fieldName === "alivePercent";
      return state;
    }
    return state;
  },
});
