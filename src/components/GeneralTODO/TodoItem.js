import React from "react";
import classes from "./TodoItem.module.css";
import Button from "../../UI/Button";
function TodoItem(props) {
  return (
    <li className={classes.item} onClick={() => console.log("Hiya")}>
      <p>{props.taskText}</p>
      <Button title="Delete" className={classes.btn} />
    </li>
  );
}

export default TodoItem;
