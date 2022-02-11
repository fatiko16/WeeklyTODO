import React from "react";
import classes from "./TodoList.module.css";
import TodoItem from "./TodoItem";
import TodoItemControls from "./TodoItemControls";
function TodoList(props) {
  return (
    <ul className={classes.list}>
      <h2>{props.title}</h2>
      <TodoItem
        taskText={
          "Prepare the Kanban task in a way that header an task text works"
        }
      />
      <TodoItem taskText={"Finish Authentication part from Udemy"} />
      <TodoItem taskText={"Start Implementing Authentication"} />
      <TodoItem taskText={"Check everything and redeploy the app"} />
      <TodoItemControls />
    </ul>
  );
}

export default TodoList;
