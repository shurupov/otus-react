import { createSlice } from "@reduxjs/toolkit";

export interface ConwaySettings {
  fieldWidth: number;
  fieldHeight: number;
  cellSize: number;
  animationDelay: number;
  alivePercent: number;
  animationStepsCount: number;
}

export const conwaySettingsSlice = createSlice({
  name: "conwaySettings",
  initialState: {
    fieldWidth: 20,
    fieldHeight: 20,
    cellSize: 10,
    animationDelay: 50,
    alivePercent: 30,
    animationStepsCount: 4,
  },
  reducers: {
    changeSetting: (state, action) => {
      if (action.payload.field && action.payload.value) {
        const fieldName = action.payload.field;
        return {
          ...state,
          [fieldName]: action.payload.value,
        };
      }
      return state;
    },
  },
});

export const conwayFieldSlice = createSlice({
  name: "conwayField",
  initialState: [
    [
      {
        alive: false,
        step: 0,
        animated: false,
      },
    ],
  ],
  reducers: {
    update: (state, action) => {
      return action.payload;
    },
  },
});
