import React from "react";
import classes from "./AuthForm.module.css";
import Button from "../../UI/Button";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { errorMessageHandler } from "../../utilities/AuthUtilities";

function AuthForm(props) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmationInputRef = useRef();

  const hasError = useSelector((state) => state.auth.hasError);
  const error = useSelector((state) => state.auth.error);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (!props.isLogin) {
      const enteredPasswordConfirmation =
        passwordConfirmationInputRef.current.value;
      if (enteredPassword !== enteredPasswordConfirmation) {
        return;
      }
    }
    props.onSubmit(enteredEmail, enteredPassword, true);
  };

  return (
    <React.Fragment>
      <form className={classes.signup} onSubmit={submitHandler}>
        <h1>{props.title}</h1>
        <label htmlFor="email">
          Email
          <input type="email" ref={emailInputRef} required />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            autoComplete="on"
            ref={passwordInputRef}
            required
          />
        </label>
        {!props.isLogin && (
          <label htmlFor="password-confirmation">
            Password Confirmation
            <input
              type="password"
              name="password-confirmation"
              autoComplete="on"
              required
              ref={passwordConfirmationInputRef}
            />
          </label>
        )}
        <Button title={props.buttonDescription} />
        {hasError && <p className="error">{errorMessageHandler(error)}</p>}
      </form>
    </React.Fragment>
  );
}

export default AuthForm;
