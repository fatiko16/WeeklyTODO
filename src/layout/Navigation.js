import React from "react";
import classes from "./Navigation.module.css";
import Button from "../UI/Button";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutHandler } from "../store/auth-actions";
function Navigation() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <nav className={classes.navigation}>
      <h1 className={classes.logo}>Weekly TO DO</h1>
      <ol className={classes.links}>
        {isLoggedIn && token && (
          <li>
            <Button title={"All Week"} onClick={() => history.push("/week")} />
          </li>
        )}
        {isLoggedIn && token && (
          <li>
            <Button title={"TO DO"} onClick={() => history.push("/todo")} />
          </li>
        )}
        {isLoggedIn && token && (
          <li>
            <Button
              title={"Logout"}
              onClick={() => dispatch(logoutHandler())}
            />
          </li>
        )}
        {!isLoggedIn && !token && (
          <li>
            <Button title={"Sign in"} onClick={() => history.push("/signin")} />
          </li>
        )}
        {!isLoggedIn && !token && (
          <li>
            <Button
              title={"Create New Account"}
              onClick={() => history.push("/signup")}
            />
          </li>
        )}
      </ol>
    </nav>
  );
}

export default Navigation;
