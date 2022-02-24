import React from "react";
import classes from "./SignUpForm.module.css";
import AuthForm from "./AuthForm";
function SignUpForm() {
  return (
    <React.Fragment>
      <AuthForm buttonDescription={"Create New Account"} />
    </React.Fragment>
  );
}

export default SignUpForm;
