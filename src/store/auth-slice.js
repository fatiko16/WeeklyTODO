import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: "",
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
