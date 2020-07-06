import { combineReducers } from "@reduxjs/toolkit";
import { loginSlice } from "smart/User/Login";
import { conwaySlice } from "smart/ControlsForm/ControlsForm";

export const reducer = combineReducers({
  user: loginSlice.reducer,
  conway: conwaySlice.reducer,
});

export type StoreState = ReturnType<typeof reducer>;
