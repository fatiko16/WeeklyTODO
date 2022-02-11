import React from "react";
import DayTask from "./DayTask";
import classes from "./DayItem.module.css";
import Controls from "./DayItemControls";

function DayItem(props) {
  return (
    <div className={classes.item}>
      <h1>{props.day}</h1>
      {props.tasks.map((task) => {
        return (
          <DayTask
            key={task.id}
            task={props.tasks.filter((item) => task.id === item.id)[0]}
          />
        );
      })}
      <Controls day={props.day} />
    </div>
  );
}

export default DayItem;
