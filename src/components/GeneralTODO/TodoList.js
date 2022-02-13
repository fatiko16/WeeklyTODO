import React from "react";
import classes from "./TodoList.module.css";
import TodoItem from "./TodoItem";
import TodoItemControls from "./TodoItemControls";
function TodoList(props) {
  return (
    <div className={classes.container}>
      <ul className={classes.list}>
        <h2>{props.title}</h2>
        {props.titleTodos.map((todo) => {
          return (
            <TodoItem taskText={todo.description} key={todo.id} id={todo.id} />
          );
        })}
      </ul>
      <TodoItemControls title={props.title} titleID={props.id} />
    </div>
  );
}

export default TodoList;
