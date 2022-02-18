import React, { useRef } from "react";
import { useState } from "react";
import Button from "../../UI/Button";
import classes from "./TodoForm.module.css";

function TodoForm(props) {
  const descriptionRef = useRef();
  //Form Validation Part
  const [descriptionText, setDescriptionText] = useState("");
  const [isDescriptionTouchedorSentEmpty, setIsDescriptionTouchedorSentEmpty] =
    useState(false);
  const isDescriptionValid = descriptionText.length > 0;

  const descriptionChangedHandler = () => {
    setDescriptionText(descriptionRef.current.value);
  };
  const descriptionTouchedHandler = () => {
    setIsDescriptionTouchedorSentEmpty(true);
  };
  //Form Validation Ends

  const submitHandler = (event) => {
    event.preventDefault();
    const descriptionValue = descriptionRef.current.value;
    if (!isDescriptionValid) {
      setIsDescriptionTouchedorSentEmpty(true);
      return;
    }

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
