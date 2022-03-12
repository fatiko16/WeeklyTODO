import React from "react";
import AuthForm from "./AuthForm";
import { useDispatch } from "react-redux";
import { createNewUser } from "../../store/auth-actions";
function SignUpForm() {
  const dispatch = useDispatch();
  const submitHandler = (email, password) => {
    dispatch(createNewUser(email, password));
  };
  return (
    <React.Fragment>
      <AuthForm
        title="Create New Account"
        buttonDescription={"Create New Account"}
        isLogin={false}
        onSubmit={submitHandler}
      />
    </React.Fragment>
  );
}

export default SignUpForm;
