import React, { useRef } from "react";
import classes from "./DayTaskForm.module.css";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import useValidate from "../hooks/useValidate";
import { validateByLength } from "../../utilities/ValidationMethods";
import { validateByTime } from "../../utilities/ValidationMethods";

function DayTaskForm(props) {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const durationRef = useRef();
  const {
    value: titleValue,
    isValueTouched: isTitleTouched,
    isValueValid: isTitleValid,
    valueChangedHandler: titleChangedHandler,
    valueTouchedHandler: titleTouchedHandler,
  } = useValidate(validateByLength);

  const {
    value: durationValue,
    isValueTouched: isDurationTouched,
    isValueValid: isDurationValid,
    valueChangedHandler: durationChangedHandler,
    valueTouchedHandler: durationTouchedHandler,
  } = useValidate(validateByTime);

  const isInvalidTitleEntered = !isTitleValid && isTitleTouched;
  const titleClasses = isInvalidTitleEntered ? "invalid" : "";

  const isInvalidDurationEntered = !isDurationValid && isDurationTouched;
  const duration = isInvalidDurationEntered ? "invalid" : "";

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(titleValue, durationValue);
  };
  const hideModalHandler = () => {
    dispatch(uiActions.hideNewItemWindow());
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label htmlFor="title">
        Task Title
        <input
          type="text"
          id="title"
          ref={titleRef}
          className={titleClasses}
          onChange={titleChangedHandler}
          onBlur={titleTouchedHandler}
          defaultValue={props.title}
        />
        {isInvalidTitleEntered && (
          <p className="error">Title cannot be empty</p>
        )}
      </label>
      <label htmlFor="duration">
        Duration (In Minutes)
        <input
          type="number"
          id="duration"
          ref={durationRef}
          className={duration}
          onChange={durationChangedHandler}
          onBlur={durationTouchedHandler}
          defaultValue={props.duration}
        />
        {isInvalidDurationEntered && (
          <p className="error">
            Duration must be bigger than 0 and lower than 360
          </p>
        )}
      </label>
      <Button title={props.isEditing ? "Edit Task" : "Add Task"} />
      <Button title={"Cancel"} type="button" onClick={hideModalHandler} />
    </form>
  );
}

export default DayTaskForm;
