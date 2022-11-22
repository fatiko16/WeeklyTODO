import React from "react";
import { Oval } from "react-loader-spinner";
import classes from "./LoadingSpinner.module.css";
export default function LoadingSpinner() {
  return (
    <div className={classes.spinner}>
      <Oval color="#fc4a1a" height={80} width={80} />
    </div>
  );
}
