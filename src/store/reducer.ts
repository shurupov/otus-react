import { combineReducers } from "@reduxjs/toolkit";
import { loginSlice } from "smart/User/slice";
import { conwayFieldSlice, conwaySettingsSlice } from "smart/ConwayLife/slice";

export const reducer = combineReducers({
  user: loginSlice.reducer,
  conwaySettings: conwaySettingsSlice.reducer,
  conwayField: conwayFieldSlice.reducer,
});

export type StoreState = ReturnType<typeof reducer>;
