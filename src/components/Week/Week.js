import React from "react";
import classes from "./Week.module.css";
import DayItem from "../Day/DayItem";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../UI/LoadingSpinner";
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
  const loading = useSelector((state) => state.ui.loading);
  return (
    <React.Fragment>
      {loading && <LoadingSpinner />}
      <div className={classes.week}>
        {props.tasks &&
          days.map((day) => {
            const dayTasks = props.tasks.filter((task) => task.day === day);
            return <DayItem key={day} day={day} tasks={dayTasks} />;
          })}
        {!props.tasks && <Oval color="#00BFFF" height={80} width={80} />}
      </div>
    </React.Fragment>
  );
}

export default Week;
