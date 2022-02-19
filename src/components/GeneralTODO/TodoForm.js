import React from "react";
import Button from "../../UI/Button";
import classes from "./TodoForm.module.css";
import useValidate from "../hooks/useValidate";

const validateByLength = (valueLength) => {
  return valueLength > 0;
};
function TodoForm(props) {
  const {
    value: descriptionValue,
    isValueTouched: isDescriptionTouched,
    isValueValid: isDescriptionValid,
    valueChangedHandler: descriptionChangedHandler,
    valueTouchedHandler: descriptionTouchedHandler,
  } = useValidate(validateByLength);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!isDescriptionValid) {
      return;
    }
    props.onSubmit(descriptionValue);
  };

  const isInvalidDescriptionEntered =
    !isDescriptionValid && isDescriptionTouched;
  const descriptionClasses = isInvalidDescriptionEntered ? "invalid" : "";

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label htmlFor="description">
        Description
        <input
          className={descriptionClasses}
          id="description"
          type="text"
          onChange={descriptionChangedHandler}
          onBlur={descriptionTouchedHandler}
        />
      </label>
      {isInvalidDescriptionEntered && (
        <p className="error">Description cannot be empty</p>
      )}
      <Button disabled={!isDescriptionValid} title="Add" />
      <Button title="Cancel" onClick={props.onClose} />
    </form>
  );
}

export default TodoForm;
