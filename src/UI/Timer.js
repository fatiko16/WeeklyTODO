import React, { useState } from "react";
import { useTimer } from "react-timer-hook";
import classes from "./Timer.module.css";
import useSound from "use-sound";
import oldAlarmClock from "../sounds/oldalarmclock.mp3";
function Timer({ expiryTimestamp }) {
  const [isAlarmOff, setIsAlarmOff] = useState(false);
  const [play] = useSound(oldAlarmClock);
  const { seconds, minutes, hours, isRunning, pause, resume } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
    autoStart: false,
  });
  if (hours === 0 && minutes === 0 && seconds === 0 && !isAlarmOff) {
    play();
    setIsAlarmOff(true);
  }
  const hoursE = <span>{hours}</span>;
  return (
    <div className={classes.timer}>
      <div>
        {hours > 0 ? hoursE : ""}
        {hours > 0 && ":"}
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button onClick={isRunning ? pause : resume}>
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
}

export default Timer;
