import { authActions } from "./auth-slice";
import { db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";
const usersCollectionRef = collection(db, "users");
const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const createUser = async (userUID) => {
  try {
    await addDoc(usersCollectionRef, {
      userUID: userUID,
      tasks: [],
      todos: [],
    });
  } catch (error) {
    console.log(error);
    console.log("Something went wrong while creating a user");
  }
};
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

const getUserUID = async (idToken) => {
  const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
  const requestUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" + apiKey;
  const response = await fetch(requestUrl, {
    method: "POST",
    body: JSON.stringify({
      idToken: idToken,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data.users[0].localId;
  }
};

export const retrieveStoredTokendData = () => {
  return () => {
    const storedToken = localStorage.getItem("token");
    const storedExpirationTime = localStorage.getItem("expirationTime");
    const storedUserUID = localStorage.getItem("userUID");
    const remainingTime = getRemainingTime(storedExpirationTime);
    return {
      token: storedToken,
      duration: remainingTime,
      userUID: storedUserUID,
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
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    dispatch(authActions.logout());
  };
};

export const loginOrCreateUserHandler = (
  url,
  email,
  password,
  returnSecureToken,
  isLogin
) => {
  return async (dispatch) => {
    const requestUrl = url + apiKey;
    try {
      const response = await fetch(requestUrl, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: returnSecureToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        const token = data.idToken;
        const expiringTime = getExpiringTime(data.expiresIn * 1000);
        const userUID = await getUserUID(token);
        localStorage.setItem("expirationTime", expiringTime);
        localStorage.setItem("userUID", userUID);
        localStorage.setItem("token", token);
        const remainingTime = getRemainingTime(expiringTime);
        logoutTimer = setTimeout(
          () => dispatch(logoutHandler()),
          remainingTime
        );
        dispatch(authActions.login({ token, userUID }));
        dispatch(authActions.clearError());
        if (!isLogin) {
          await createUser(userUID);
        }
      } else {
        let error = "Encountered an error while signing up";
        if (data && data.error && data.error.message) {
          error = data.error.message;
        }
        dispatch(authActions.gotError(error));
        throw new Error(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const refreshIDToken = () => {
  return async () => {
    try {
      const response = await fetch(
        "https://securetoken.googleapis.com/v1/token?key=" + apiKey
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};
