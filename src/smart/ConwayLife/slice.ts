import { createSlice } from "@reduxjs/toolkit";

export const conwaySlice = createSlice({
  name: "conway",
  initialState: {
    fieldWidth: 20,
    fieldHeight: 20,
    cellSize: 10,
    animationDelay: 50,
    alivePercent: 30,
    animationStepsCount: 4,
    reinitField: false,
    initialized: false,
  },
  reducers: {
    initField: (state) => {
      state.reinitField = true;
      return state;
    },
    updated: (state) => {
      state.reinitField = false;
      return state;
    },
    changeSetting: (state, action) => {
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
  },
});
