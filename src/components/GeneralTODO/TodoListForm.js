import React, { useRef } from "react";
import classes from "./TodoListForm.module.css";
import Button from "../../UI/Button";

function TodoListForm(props) {
  const descriptionRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(descriptionRef.current.value);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label htmlFor="description">
        Description
        <input id="description" type="text" ref={descriptionRef} />
      </label>
      <Button title="Add" />
      <Button title="Cancel" />
    </form>
  );
}

export default TodoListForm;
