import React from "react";
import classes from "./TodoItemControls.module.css";
import Button from "../../UI/Button";
function TodoItemControls() {
  return (
    <div className={classes.controls}>
      <Button title={"Add New Item"} className={classes.control} />
      {/* <Button title={"Show Item"} className={classes.control} /> */}
    </div>
  );
}

export default TodoItemControls;
