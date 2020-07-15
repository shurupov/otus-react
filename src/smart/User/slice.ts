import { createSlice } from "@reduxjs/toolkit";

export interface UserStore {
  id: number | null;
  username: string;
  first: string;
  last: string;
}

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
