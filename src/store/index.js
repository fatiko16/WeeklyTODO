import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./task-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: { task: taskSlice.reducer, ui: uiSlice.reducer },
});

export default store;
