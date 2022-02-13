import React from "react";
import classes from "./TodoItem.module.css";
import Button from "../../UI/Button";
import { deleteTodo } from "../../store/todo-actions";
import { useDispatch } from "react-redux";
import { todoActions } from "../../store/todo-slice";
function TodoItem(props) {
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteTodo(props.id));
    dispatch(todoActions.todosUpdated());
  };
  return (
    <li className={classes.item} onClick={() => console.log("Hiya")}>
      <p>{props.taskText}</p>
      <Button title="Delete" className={classes.btn} onClick={deleteHandler} />
    </li>
  );
}

export default TodoItem;
