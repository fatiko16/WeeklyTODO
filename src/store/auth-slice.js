import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: "",
    hasError: false,
    error: "",
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
    gotError(state, action) {
      state.hasError = true;
      state.error = action.payload;
    },
    clearError(state) {
      state.hasError = false;
      state.error = "";
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
