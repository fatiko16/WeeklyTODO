import React, { useRef } from "react";
import { useState } from "react";
import Button from "../../UI/Button";
import classes from "./TodoForm.module.css";

function TodoForm(props) {
  const descriptionRef = useRef();

  const [descriptionIsNotValid, setDescriptionIsNotValid] = useState(false);
  const [descriptionText, setDescriptionText] = useState("");
  const [isDescriptionTouched, setIsDescriptionTouched] = useState(false);
  const isDescriptionValid = descriptionText.length > 0;
  const descriptionChangedHandler = () => {
    setDescriptionText(descriptionRef.current.value);
  };
  const descriptionTouchedHandler = () => {
    setIsDescriptionTouched(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const descriptionValue = descriptionRef.current.value;
    if (!isDescriptionValid) {
      // setDescriptionIsNotValid(true);
      return;
    }
    console.log(descriptionValue);
    props.onSubmit(descriptionValue);
  };
  //CONTINUE WITH THIS LOGIC
  if (!isDescriptionValid && isDescriptionTouched) {
  }
  const isDescriptionInvalid = !isDescriptionValid && isDescriptionTouched;
  const descriptionClass = isDescriptionInvalid ? `${classes.invalid}` : "";

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label htmlFor="description">
        Description
        <input
          className={descriptionClass}
          id="description"
          type="text"
          ref={descriptionRef}
          onChange={descriptionChangedHandler}
          onBlur={descriptionTouchedHandler}
        />
      </label>
      {isDescriptionInvalid && (
        <p className="error">Description cannot be empty</p>
      )}
      <Button title="Add" />
      <Button title="Cancel" onClick={props.onClose} />
    </form>
  );
}

export default TodoForm;
