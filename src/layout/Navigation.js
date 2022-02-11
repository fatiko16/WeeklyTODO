import React from "react";
import classes from "./Navigation.module.css";
import Button from "../UI/Button";
import { useHistory } from "react-router-dom";
function Navigation() {
  const history = useHistory();

  return (
    <nav className={classes.navigation}>
      <h1 className={classes.logo}>Weekly TO DO</h1>
      <ol className={classes.links}>
        <li>
          <Button title={"All Week"} onClick={() => history.push("/week")} />
        </li>
        <li>
          <Button title={"TO DO"} onClick={() => history.push("/todo")} />
        </li>
        <li>
          <Button title={"Logout"} />
        </li>
      </ol>
    </nav>
  );
}

export default Navigation;
