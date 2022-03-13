import React from "react";
import classes from "./Week.module.css";
import DayItem from "../Day/DayItem";
import { refreshAuth } from "../../store/auth-actions";
import { useDispatch } from "react-redux";
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
function Week(props) {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      {/* <button onClick={() => dispatch(refreshAuth())}>
        Click me to get token refreshed
      </button> */}
      <div className={classes.week}>
        {props.tasks &&
          days.map((day) => {
            const dayTasks = props.tasks.filter((task) => task.day === day);
            return <DayItem key={day} day={day} tasks={dayTasks} />;
          })}
        {!props.tasks && <h1>Loading tasks...</h1>}
      </div>
    </React.Fragment>
  );
}

export default Week;
