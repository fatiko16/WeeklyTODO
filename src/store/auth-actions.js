import { authActions } from "./auth-slice";
import { auth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const getExpiringTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const expiringTime = expirationTime - currentTime;
  return expiringTime;
};

export let logoutTimer;
export const updateTimer = (time) => {
  return (dispatch) => {
    const remainingTime = getExpiringTime(time);
    console.log(remainingTime);
    console.log(remainingTime / 60000, "In Minutes");
    logoutTimer = setTimeout(() => dispatch(logoutHandler()), remainingTime);
  };
};

export const logoutHandler = () => {
  return async (dispatch) => {
    if (logoutTimer) {
      await signOut(auth);
      clearTimeout(logoutTimer);
    }
    dispatch(authActions.logout());
    localStorage.removeItem("token");
  };
};

const userSignInSignUpHelper = (expiringTime, userUID, token, dispatch) => {
  const remainingTime = getExpiringTime(expiringTime);
  logoutTimer = setTimeout(() => dispatch(logoutHandler()), remainingTime);
  dispatch(authActions.login({ token, userUID }));
  dispatch(authActions.clearError());
};

export const createNewUser = (email, password) => {
  return async (dispatch) => {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      const token = data.user.accessToken;
      const expiringTime = data.user.stsTokenManager.expirationTime;
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
      const expiringTime = data.user.stsTokenManager.expirationTime;
      const userUID = data.user.uid;
      localStorage.setItem("token", token);
      userSignInSignUpHelper(expiringTime, userUID, token, dispatch);
    } catch (error) {
      console.log(error);
    }
  };
};

export const refreshAuth = () => {
  return async () => {
    try {
      const data = await auth.currentUser.getIdToken(true);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};
