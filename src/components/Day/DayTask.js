import React from "react";
import classes from "./DayTask.module.css";
import Button from "../../UI/Button";
import Timer from "../../UI/Timer";
import { deleteTask, toggleTaskDone } from "../../store/task-actions";
import { taskActions } from "../../store/task-slice";
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";

function DayTask(props) {
  const dispatch = useDispatch();
  const time = new Date();
  time.setSeconds(time.getSeconds() + parseInt(props.task.duration) * 60);
  const deleteTaskHandler = () => {
    dispatch(deleteTask(props.task.id));
    dispatch(taskActions.tasksUpdated());
  };
  const checkboxHandler = () => {
    dispatch(toggleTaskDone(props.task.id, props.task.isDone));
    dispatch(taskActions.tasksUpdated());
  };

  const editTaskHandler = () => {
    dispatch(
      uiActions.editWindowView({
        day: props.task.day,
        title: props.task.title,
        duration: props.task.duration,
        id: props.task.id,
      })
    );
  };
  return (
    <div className={classes.task} id={props.task.id}>
      <div className={classes.title}>
        <h3>{props.task.title}</h3>
      </div>
      <div>
        <input
          type="checkbox"
          id="checkbox"
          checked={props.task.isDone}
          onChange={checkboxHandler}
        />
      </div>
      {/* {props.task.id === "hzy1pXQdNdp66GUjQ9M8" && (
        <Timer expiryTimestamp={time} autoStart={false} />
      )} */}
      <Timer expiryTimestamp={time} autoStart={false} taskId={props.task.id} />
      <div className={classes.controls}>
        <Button title="Edit" onClick={editTaskHandler} />
        <Button title="Delete" onClick={deleteTaskHandler} />
      </div>
    </div>
  );
}

export default DayTask;
