import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    changed: false,
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
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
