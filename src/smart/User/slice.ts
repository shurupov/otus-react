import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
  },
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        username: action.payload,
      };
    },
    logout: (state) => {
      return {
        ...state,
        username: "",
      };
    },
  },
});
