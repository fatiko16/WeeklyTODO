import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    changed: false,
    newDuration: 0,
  },
  reducers: {
    replaceTasks(state, action) {
      state.tasks = action.payload;
    },
    tasksUpdated(state) {
      state.changed = true;
    },
    tasksNoUpdate(state) {
      state.changed = false;
    },
    updateNewDuration(state, action) {
      state.newDuration = action.payload;
    },
    resetNewDuration(state) {
      state.newDuration = 0;
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
