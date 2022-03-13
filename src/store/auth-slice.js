import { createSlice } from "@reduxjs/toolkit";
const existingToken = localStorage.getItem("token");
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: existingToken,
    userUID: "",
    refreshToken: "",
    hasError: false,
    error: "",
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      console.log(action);
      state.token = action.payload.token;
      state.userUID = action.payload.userUID;
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
    storeRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
  },
});

export const isLoading = authSlice.getInitialState().loading;

export const authActions = authSlice.actions;
export default authSlice;
