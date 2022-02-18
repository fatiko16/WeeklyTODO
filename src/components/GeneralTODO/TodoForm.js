import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Button from "../../UI/Button";
import classes from "./TodoForm.module.css";

function TodoForm(props) {
  const descriptionRef = useRef();
  const [descriptionText, setDescriptionText] = useState("");
  const [isDescriptionTouchedorSentEmpty, setIsDescriptionTouchedorSentEmpty] =
    useState(false);
  const isDescriptionValid = descriptionText.length > 0;
  console.log(isDescriptionValid);
  const descriptionChangedHandler = () => {
    setDescriptionText(descriptionRef.current.value);
  };
  const descriptionTouchedHandler = () => {
    setIsDescriptionTouchedorSentEmpty(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const descriptionValue = descriptionRef.current.value;
    if (!isDescriptionValid) {
      setIsDescriptionTouchedorSentEmpty(true);
      return;
    }
    console.log(descriptionValue);
    props.onSubmit(descriptionValue);
  };

  const isDescriptionInvalid =
    !isDescriptionValid && isDescriptionTouchedorSentEmpty;
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
