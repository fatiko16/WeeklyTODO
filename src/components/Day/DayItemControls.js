import React from "react";
import classes from "./DayItemControls.module.css";
import Button from "../../UI/Button";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
function DayItemControls(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className={classes.controls}>
      <Button
        title={"Add New Item"}
        className={classes.control}
        onClick={() => dispatch(uiActions.showNewItemWindow(props.day))}
      />
      <Button
        title={"Show Item"}
        className={classes.control}
        onClick={() => history.push(`/week/${props.day}`)}
      />
    </div>
  );
}

export default DayItemControls;
