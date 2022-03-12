import React from "react";
import AuthForm from "./AuthForm";
import { useDispatch } from "react-redux";
import {
  loginOrCreateUserHandler,
  logInWithEmailAndPassword,
} from "../../store/auth-actions";

function LogInForm() {
  const dispatch = useDispatch();
  const title = "Login";
  const buttonDescription = "Login";
  const isLogin = true;
  const submitHandler = (email, password) => {
    dispatch(logInWithEmailAndPassword(email, password));
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
