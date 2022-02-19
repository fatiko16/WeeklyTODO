import React from "react";
import DayTask from "./DayTask";
import classes from "./DayItem.module.css";
import DayItemControls from "./DayItemControls";

const calculateTotalWorkDone = (previousValue, currentValue) => {
  if (currentValue.isDone) {
    console.log(parseInt(currentValue.duration));
    return previousValue + parseInt(currentValue.duration);
  }
  return 0;
};

const calculateTotalWorkRemaining = (previousValue, currentValue) => {
  if (!currentValue.isDone) {
    return previousValue + parseInt(currentValue.duration);
  }
  return 0;
};

function DayItem(props) {
  const initialValue = 0;
  console.log(props.day, props.tasks);
  const totalWorkDone = props.tasks.reduce(
    calculateTotalWorkDone,
    initialValue
  );
  const totalRemainingWork = props.tasks.reduce(
    calculateTotalWorkRemaining,
    initialValue
  );
  console.log(props.day, totalWorkDone, totalRemainingWork);
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
