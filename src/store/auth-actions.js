import { authActions } from "./auth-slice";
import { auth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const user = auth.currentUser;
const getExpiringTime = (timeInMillieSeconds) => {
  const currentTime = new Date().getTime();
  const expiringTime = currentTime + timeInMillieSeconds;
  return expiringTime;
};
const getRemainingTime = (expiringTime) => {
  const currentTime = new Date().getTime();
  const remainingTime = expiringTime - currentTime;
  return remainingTime;
};

export const retrieveStoredTokendData = () => {
  return () => {
    const storedToken = localStorage.getItem("token");
    const storedExpirationTime = localStorage.getItem("expirationTime");
    const storedUserUID = localStorage.getItem("userUID");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const remainingTime = getRemainingTime(storedExpirationTime);
    return {
      token: storedToken,
      duration: remainingTime,
      userUID: storedUserUID,
      refreshToken: storedRefreshToken,
    };
  };
};

export let logoutTimer;
export const updateTimer = (time) => {
  return (dispatch) => {
    logoutTimer = setTimeout(() => dispatch(logoutHandler()), time);
  };
};

export const logoutHandler = () => {
  return (dispatch) => {
    console.log("loggin out");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userUID");
    localStorage.removeItem("refreshToken");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    dispatch(authActions.logout());
  };
};

const userSignInSignUpHelper = (expiringTime, userUID, token, dispatch) => {
  localStorage.setItem("expirationTime", expiringTime);
  localStorage.setItem("userUID", userUID);
  localStorage.setItem("token", token);
  const remainingTime = getRemainingTime(expiringTime);
  console.log(remainingTime);

  logoutTimer = setTimeout(() => dispatch(logoutHandler()), remainingTime);
  dispatch(authActions.login({ token, userUID }));
  dispatch(authActions.clearError());
};

export const createNewUser = (email, password) => {
  return async (dispatch) => {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      const token = data.user.accessToken;
      const expiringTime = getExpiringTime(
        data.user.stsTokenManager.expirationTime
      );

      const userUID = data.user.uid;
      userSignInSignUpHelper(expiringTime, userUID, token, dispatch);
    } catch (error) {
      console.log(error);
    }
  };
};

export const logInWithEmailAndPassword = (email, password) => {
  return async (dispatch) => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      const token = data.user.accessToken;
      console.log(data.user.stsTokenManager.expirationTime);
      const expiringTime = getExpiringTime(
        data.user.stsTokenManager.expirationTime
      );
      const userUID = data.user.uid;
      userSignInSignUpHelper(expiringTime, userUID, token, dispatch);
    } catch (error) {
      console.log(error);
    }
  };
};
