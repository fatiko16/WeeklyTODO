import React from "react";
import classes from "./TodoListForm.module.css";
import { addTodoList, createTodo } from "../../store/todo-actions";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { todoActions } from "../../store/todo-slice";
import useValidate from "../hooks/useValidate";
import { validateByLength } from "../../utilities/ValidationMethods";
import { useSelector } from "react-redux";

function TodoListForm(props) {
  const dispatch = useDispatch();
  const userUID = useSelector((state) => state.auth.useruID);
  const {
    value: firstTodoValue,
    isValueTouched: isFirstTodoTouched,
    isValueValid: isFirstTodoValid,
    valueChangedHandler: firstTodoChangedHandler,
    valueTouchedHandler: firstTodoTouchedHandler,
  } = useValidate(validateByLength);
  const {
    value: titleValue,
    isValueTouched: isTitleTouched,
    isValueValid: isTitleValid,
    valueChangedHandler: titleChangedHandler,
    valueTouchedHandler: titleTouchedHandler,
  } = useValidate(validateByLength);

  const isInvalidFirstToDoEntered = !isFirstTodoValid && isFirstTodoTouched;
  const firstTodoClasses = isInvalidFirstToDoEntered ? "invalid" : "";

  const isFormValid = isTitleValid && isFirstTodoValid;

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(addTodoList(titleValue));
    dispatch(createTodo(titleValue, firstTodoValue, userUID));
    dispatch(todoActions.todosUpdated());
    props.onClose();
  };

  const isInvalidTitleEntered = !isTitleValid && isTitleTouched;
  const titleClasses = isInvalidTitleEntered ? "invalid" : "";
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label htmlFor="title">
        Title
        <input
          id="title"
          type="text"
          onChange={titleChangedHandler}
          onBlur={titleTouchedHandler}
          className={titleClasses}
        />
        {isInvalidTitleEntered && (
          <p className="error">Title cannot be empty!</p>
        )}
      </label>
      <label htmlFor="first_todo">
        First TO DO
        <input
          id="first_todo"
          type="text"
          onChange={firstTodoChangedHandler}
          onBlur={firstTodoTouchedHandler}
          className={firstTodoClasses}
        />
        {isInvalidFirstToDoEntered && (
          <p className="error">First TO DO cannot be empty!</p>
        )}
      </label>
      <Button disabled={!isFormValid} title="Add" />
      <Button title="Cancel" onClick={props.onClose} />
    </form>
  );
}

export default TodoListForm;
