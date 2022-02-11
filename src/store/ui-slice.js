import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    id: "",
    day: "",
    title: "",
    duration: 0,
    isNewItemWindowShown: false,
    isDayView: false,
  },
  reducers: {
    showNewItemWindow(state, action) {
      state.id = "";
      state.day = action.payload;
      state.title = "";
      state.duration = 0;
      state.isNewItemWindowShown = true;
    },
    hideNewItemWindow(state) {
      state.day = "";
      state.isNewItemWindowShown = false;
    },
    showDayView(state) {
      state.isDayView = true;
    },
    hideDayView(state) {
      state.isDayView = false;
    },
    editWindowView(state, action) {
      state.day = action.payload.day;
      state.title = action.payload.title;
      state.duration = action.payload.duration;
      state.id = action.payload.id;
      state.isNewItemWindowShown = true;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
