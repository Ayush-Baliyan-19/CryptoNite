import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TokenState = {
    token: string;
};
const initialState = {
  token: "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});
