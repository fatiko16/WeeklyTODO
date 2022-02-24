import React, { useState } from "react";
import { useTimer } from "react-timer-hook";
import classes from "./Timer.module.css";
import useSound from "use-sound";
import oldAlarmClock from "../sounds/oldalarmclock.mp3";
import { useEffect } from "react";
function Timer({ expiryTimestamp }) {
  const [isAlarmOff, setIsAlarmOff] = useState(false);
  const [play] = useSound(oldAlarmClock);
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
    // console.log("You may need me");
    restart(expiryTimestamp, false);
  }, [expiryTimestamp]);
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
