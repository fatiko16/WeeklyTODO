import React, { useRef } from "react";
import classes from "./TodoListForm.module.css";
import { addTodoList } from "../../store/todo-actions";
import { createTodo } from "../../store/todo-actions";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { todoActions } from "../../store/todo-slice";
function TodoListForm(props) {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const firstTodoRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(addTodoList(titleRef.current.value));
    dispatch(createTodo(titleRef.current.value, firstTodoRef.current.value));
    dispatch(todoActions.todosUpdated());
    props.onClose();
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label htmlFor="title">
        Title
        <input id="title" type="text" ref={titleRef} />
      </label>
      <label htmlFor="first_todo">
        First TO DO
        <input id="first_todo" type="text" ref={firstTodoRef} />
      </label>
      <Button title="Add" />
      <Button title="Cancel" onClick={props.onClose} />
    </form>
  );
}

export default TodoListForm;
