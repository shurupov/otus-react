import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStore } from "store/store";

export const loginSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    username: "",
    first: "",
    last: "",
  },
  reducers: {
    login: (state, action) => {
      return {
        ...action.payload,
      };
    },
    logout: () => {
      return {
        id: null,
        username: "",
        first: "",
        last: "",
      };
    },
  },
});
