import React from "react";
import AuthForm from "./AuthForm";
import { useDispatch } from "react-redux";
import { loginOrCreateUserHandler } from "../../store/auth-actions";

function LogInForm() {
  const dispatch = useDispatch();
  const title = "Login";
  const buttonDescription = "Login";
  const isLogin = true;
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  const submitHandler = (email, password, returnSecureToken) => {
    dispatch(
      loginOrCreateUserHandler(url, email, password, returnSecureToken, true)
    );
  };
  return (
    <AuthForm
      title={title}
      buttonDescription={buttonDescription}
      isLogin={isLogin}
      onSubmit={submitHandler}
    />
  );
}

export default LogInForm;
