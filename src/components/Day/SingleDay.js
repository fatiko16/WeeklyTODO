import React from "react";
import classes from "./SingleDay.module.css";
import DayTask from "./DayTask";
import DayItemControls from "./DayItemControls";
import Button from "../../UI/Button";
import { useParams, useHistory } from "react-router-dom";
import { getWorkDoneAndRemaining } from "../../utilities/CalculateWorkDoneAndRemaining";
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function SingleDay(props) {
  const history = useHistory();
  const params = useParams();
  const dayTasks = props.tasks.filter((task) => task.day === params.day);
  const { workDone: totalWorkDone, workRemaining: totalRemainingWork } =
    getWorkDoneAndRemaining(dayTasks);
  const nextDay = () => {
    const dayIndex = days.indexOf(params.day);
    if (dayIndex === days.length - 1) {
      return 0;
    } else {
      return dayIndex + 1;
    }
  };

  const previousDay = () => {
    const dayIndex = days.indexOf(params.day);
    if (dayIndex === 0) {
      return days.length - 1;
    }
    return dayIndex - 1;
  };

  return (
    <div className={classes.single}>
      <div className={classes.control}>
        <Button
          title={"Previous"}
          onClick={() => history.push(`/week/${days[previousDay()]}`)}
        />
        <h1>{params.day}</h1>
        <Button
          title={"Next"}
          onClick={() => history.push(`/week/${days[nextDay()]}`)}
        />
      </div>
      {dayTasks.map((task) => {
        return (
          <DayTask
            key={task.id}
            task={dayTasks.filter((item) => task.id === item.id)[0]}
            onDelete={props.onDelete}
            onDone={props.onDone}
          />
        );
      })}
      <DayItemControls
        day={params.day}
        totalWorkDone={totalWorkDone}
        totalRemainingWork={totalRemainingWork}
      />
    </div>
  );
}

export default SingleDay;
