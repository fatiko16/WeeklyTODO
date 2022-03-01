import React from "react";
import AuthForm from "./AuthForm";
import { useDispatch } from "react-redux";
import { loginOrCreateUserHandler } from "../../store/auth-actions";
function SignUpForm() {
  const dispatch = useDispatch();
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  const submitHandler = (email, password, returnSecureToken) => {
    dispatch(
      loginOrCreateUserHandler(url, email, password, returnSecureToken, false)
    );
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
