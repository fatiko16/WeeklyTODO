import React, { useRef } from "react";
import classes from "./DayTaskForm.module.css";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

function DayTaskForm(props) {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const durationRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(titleRef.current.value, durationRef.current.value);
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
          defaultValue={props.title}
        />
      </label>
      <label htmlFor="duration">
        Duration (In Minutes)
        <input
          type="number"
          id="duration"
          ref={durationRef}
          defaultValue={props.duration}
        />
      </label>
      <Button title={props.isEditing ? "Edit Task" : "Add Task"} />
      <Button title={"Cancel"} type="button" onClick={hideModalHandler} />
    </form>
  );
}

export default DayTaskForm;
