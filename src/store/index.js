import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./task-slice";
import uiSlice from "./ui-slice";
import todoSlice from "./todo-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    task: taskSlice.reducer,
    ui: uiSlice.reducer,
    todo: todoSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
