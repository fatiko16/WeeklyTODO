import { authActions } from "./auth-slice";
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
    const remainingTime = getRemainingTime(storedExpirationTime);
    return {
      token: storedToken,
      duration: remainingTime,
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
  returnSecureToken
) => {
  return async (dispatch) => {
    const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
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
        localStorage.setItem("expirationTime", expiringTime);
        localStorage.setItem("token", token);
        const remainingTime = getRemainingTime(expiringTime);
        logoutTimer = setTimeout(
          () => dispatch(logoutHandler()),
          remainingTime
        );
        console.log(logoutTimer);
        dispatch(authActions.login(token));
        // console.log(data);
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

// export const logoutHandler = () => {
//   return (dispatch) => {
//     console.log("loggin out");
//     console.log(logoutTimer);
//     if (logoutTimer) {
//       clearTimeout(logoutTimer);
//     }
//     dispatch(authActions.logout());
//   };
// };

// export const createNewUser = (url, email, password, returnSecureToken) => {
//   return async (dispatch) => {
//     const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
//     const requestUrl = url + apiKey;

//     const response = await fetch(requestUrl, {
//       method: "POST",
//       body: JSON.stringify({
//         email: email,
//         password: password,
//         returnSecureToken: returnSecureToken,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await response.json();
//     if (response.ok) {
//       const token = data.idToken;
//       localStorage.setItem("token", token);
//       dispatch(authActions.login(token));
//     } else {
//       let error = "Encountered an error while signing up";
//       if (data && data.error && data.error.message) {
//         error = data.error.message;
//       }
//       dispatch(authActions.gotError(error));
//     }

//     console.log(requestUrl, email, password, returnSecureToken);
//   };
// };

// export const loginUser = (url, email, password, returnSecureToken) => {
//   return async (dispatch) => {
//     const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
//     const requestUrl = url + apiKey;
//     try {
//       const response = await fetch(requestUrl, {
//         method: "POST",
//         body: JSON.stringify({
//           email: email,
//           password: password,
//           returnSecureToken: returnSecureToken,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();
//       if (response.ok) {
//         console.log(data);
//         dispatch(authActions.login(data.idToken));
//       } else {
//         let error = "Encountered an error while signing up";
//         if (data && data.error && data.error.message) {
//           error = data.error.message;
//         }
//         dispatch(authActions.gotError(error));
//         throw new Error(error);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
