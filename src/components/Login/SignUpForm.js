import React from "react";
import classes from "./SignUpForm.module.css";
function SignUpForm() {
  return (
    <React.Fragment>
      <form className={classes.signup}>
        <h1>Sign Up</h1>
        <label htmlFor="email">
          Email
          <input type="text" />
        </label>
        <label htmlFor="password">
          Password
          <input type="text" />
        </label>
        <label htmlFor="password-confirmation">
          Password Confirmation
          <input type="text" />
        </label>
      </form>
    </React.Fragment>
  );
}

export default SignUpForm;
