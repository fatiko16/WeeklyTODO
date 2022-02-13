import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    title: "",
    allTitles: [],
    updated: false,
  },
  reducers: {
    replaceTodos(state, action) {
      state.todos = action.payload;
    },
    replaceTodoTitles(state, action) {
      state.allTitles = action.payload;
    },
    chooseTodoList(state, action) {
      console.log(action);
      state.title = action.payload;
    },
    todosUpdated(state) {
      state.updated = true;
    },
    todosUnupdate(state) {
      state.updated = false;
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice;
