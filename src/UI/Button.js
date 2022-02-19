import React from "react";
import classes from "./Button.module.css";
function Button(props) {
  return (
    <button
      className={`${classes.btn} ${props.className}`}
      onClick={props.onClick}
      type={props.type ? props.type : ""}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
}

export default Button;
