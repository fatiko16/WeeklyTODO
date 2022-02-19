import React from "react";
import DayTask from "./DayTask";
import classes from "./DayItem.module.css";
import DayItemControls from "./DayItemControls";
import { getWorkDoneAndRemaining } from "../../utilities/CalculateWorkDoneAndRemaining";
function DayItem(props) {
  const { workDone: totalWorkDone, workRemaining: totalRemainingWork } =
    getWorkDoneAndRemaining(props.tasks);

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
      <DayItemControls
        day={props.day}
        totalWorkDone={totalWorkDone}
        totalRemainingWork={totalRemainingWork}
      />
    </div>
  );
}

export default DayItem;
