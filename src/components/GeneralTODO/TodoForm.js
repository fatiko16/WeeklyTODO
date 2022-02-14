import React, { useRef } from "react";
import Button from "../../UI/Button";
import classes from "./TodoForm.module.css";

function TodoForm(props) {
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
      <Button title="Cancel" onClick={props.onClose} />
    </form>
  );
}

export default TodoForm;
