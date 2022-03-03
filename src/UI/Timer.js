import React, { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import classes from "./Timer.module.css";
import useSound from "use-sound";
import oldAlarmClock from "../sounds/oldalarmclock.mp3";
import { useSelector } from "react-redux";
import taskSlice from "../store/task-slice";

function Timer({ expiryTimestamp, taskId }) {
  const [isAlarmOff, setIsAlarmOff] = useState(false);
  const [play] = useSound(oldAlarmClock);
  const changed = useSelector((state) => state.task.changed);
  const newDuration = useSelector((state) => state.task.newDuration);
  const changedTaskId = useSelector((state) => state.ui.id);
  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => console.warn("onExpire called"),
      autoStart: false,
    });
  if (hours === 0 && minutes === 0 && seconds === 0 && !isAlarmOff) {
    play();
    setIsAlarmOff(true);
  }
  useEffect(() => {
    if (changed && newDuration > 0 && taskId === changedTaskId) {
      const newExpiryTimeStamp = new Date();
      newExpiryTimeStamp.setSeconds(
        newExpiryTimeStamp.getSeconds() + parseInt(newDuration) * 60
      );
      console.log(newDuration, "from useEffect");
      restart(newExpiryTimeStamp, false);
    }
  }, [changed, newDuration]);
  const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
  const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
  const hoursDisplay = hours < 10 ? `0${hours}` : hours;
  const hoursE = <span>{hoursDisplay}</span>;
  return (
    <div className={classes.timer}>
      <div>
        {hours > 0 ? hoursE : ""}
        {hours > 0 && ":"}
        <span>{minutesDisplay}</span>:<span>{secondsDisplay}</span>
      </div>
      <button onClick={isRunning ? pause : resume}>
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
}

export default Timer;
