import { StoreState } from "store/store";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Reducer } from "redux";

export const actionTypes = {
  INIT_FIELD: "INIT_FIELD",
  INIT_FIELD_PERFORMED: "INIT_FIELD_PERFORMED",
  CHANGE_SETTING: "CHANGE_SETTING",
  SAGA_CHANGE_SETTING: "SAGA_CHANGE_SETTING",
  USER_LOGIN: "USER_LOGIN",
  USER_LOGOUT: "USER_LOGOUT",
};

export interface ConwayLifeAction {
  type: string;
  payload?: {
    field: string;
    value: number;
  };
}

export const defaultState: StoreState = {
  conwaySettings: {
    fieldWidth: 20,
    fieldHeight: 20,
    cellSize: 10,
    animationDelay: 50,
    alivePercent: 30,
    animationStepsCount: 4,
    reinitField: false,
  },
  username: "",
};

export const reducer: Reducer<StoreState> = createReducer(defaultState, {
  [actionTypes.INIT_FIELD]: (state: StoreState) => {
    state.conwaySettings.reinitField = true;
    return state;
  },
  [actionTypes.INIT_FIELD_PERFORMED]: (state) => {
    state.conwaySettings.reinitField = false;
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
      state.conwaySettings[fieldName] = action.payload.value;
      state.conwaySettings.reinitField =
        fieldName === "fieldHeight" ||
        fieldName === "fieldWidth" ||
        fieldName === "alivePercent";
      return state;
    }
    return state;
  },
  [actionTypes.USER_LOGIN]: (
    state: StoreState,
    action: PayloadAction<string>
  ) => {
    return {
      ...state,
      username: action.payload,
    };
  },
  [actionTypes.USER_LOGOUT]: (state: StoreState) => {
    return {
      ...state,
      username: "",
    };
  },
});
