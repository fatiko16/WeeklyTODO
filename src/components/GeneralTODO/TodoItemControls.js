import React from "react";
import { useHistory } from "react-router-dom";
import { todoActions } from "../../store/todo-slice";
import { useDispatch } from "react-redux";
import { deleteTodoList } from "../../store/todo-actions";
import classes from "./TodoItemControls.module.css";
import Button from "../../UI/Button";

function TodoItemControls(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const openNewTodoWindowHandler = () => {
    dispatch(todoActions.chooseTodoList(props.title));
    history.push("/todo/add-todo");
  };

  const deleteListHandler = () => {
    dispatch(deleteTodoList(props.titleID));
    dispatch(todoActions.todosUpdated());
  };
  return (
    <div className={classes.controls}>
      <Button
        title={"Add To-Do"}
        className={classes.control}
        onClick={openNewTodoWindowHandler}
      />
      <Button
        title={"Delete List"}
        className={classes.control}
        onClick={deleteListHandler}
      />
    </div>
  );
}

export default TodoItemControls;
