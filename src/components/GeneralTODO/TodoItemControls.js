import React from "react";
import classes from "./TodoItemControls.module.css";
import Button from "../../UI/Button";
import { useHistory } from "react-router-dom";
import { todoActions } from "../../store/todo-slice";
import { useDispatch } from "react-redux";
function TodoItemControls(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const openNewTodoWindowHandler = () => {
    dispatch(todoActions.chooseTodoList(props.title));
    history.push("/todo/add");
  };
  return (
    <div className={classes.controls}>
      <Button
        title={"Add To-Do"}
        className={classes.control}
        onClick={openNewTodoWindowHandler}
      />
      {/* <Button title={"Show Item"} className={classes.control} /> */}
    </div>
  );
}

export default TodoItemControls;
