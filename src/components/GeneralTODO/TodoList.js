import React from "react";
import classes from "./TodoList.module.css";
import TodoItem from "./TodoItem";
import TodoItemControls from "./TodoItemControls";
function TodoList(props) {
  return (
    <ul className={classes.list}>
      <h2>{props.title}</h2>
      {props.titleTodos.map((todo) => {
        return (
          <TodoItem taskText={todo.description} key={todo.id} id={todo.id} />
        );
      })}
      <TodoItemControls title={props.title} />
    </ul>
  );
}

export default TodoList;
