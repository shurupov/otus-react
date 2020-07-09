import { combineReducers } from "@reduxjs/toolkit";
import { loginSlice } from "smart/User/slice";
import { conwaySlice } from "smart/ConwayLife/slice";

export const reducer = combineReducers({
  user: loginSlice.reducer,
  conway: conwaySlice.reducer,
});

export type StoreState = ReturnType<typeof reducer>;
