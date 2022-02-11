import React from "react";
import classes from "./TodoItem.module.css";
function TodoItem(props) {
  return (
    <li className={classes.item} onClick={() => console.log("Hiya")}>
      <p>{props.taskText}</p>
    </li>
  );
}

export default TodoItem;
