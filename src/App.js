import React, { useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "./store/task-actions";
import { taskActions } from "./store/task-slice";
import { Route, Redirect, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import SingleDay from "./components/Day/SingleDay";
import NewItemWindow from "./components/Day/NewItemWindow";
import SignUp from "./components/Pages/SignUp";
import Login from "./components/Pages/Login";
import GeneralTODO from "./components/Pages/GeneralTODO";
import HomePage from "./components/Pages/HomePage";
import { updateTimer } from "./store/auth-actions";
import { authActions } from "./store/auth-slice";
import { auth } from "./firebase-config";

const Week = React.lazy(() => import("./components/Week/Week"));
function App() {
  const dispatch = useDispatch();
  const isNewItemWindowShown = useSelector(
    (state) => state.ui.isNewItemWindowShown
  );

  const tasks = useSelector((state) => state.task.tasks);
  const changed = useSelector((state) => state.task.changed);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userUID = useSelector((state) => state.auth.userUID);
  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const token = user.stsTokenManager.accessToken;
        const userUID = user.uid;
        const expirationTime = user.stsTokenManager.expirationTime;
        dispatch(authActions.login({ token, userUID }));
        dispatch(updateTimer(expirationTime));
      }
    });
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserData(userUID));
    dispatch(taskActions.tasksNoUpdate());
  }, [changed, dispatch, userUID]);
  return (
    <Layout>
      {!isLoading && (
        <Suspense fallback={<p>Loading...</p>}>
          {isNewItemWindowShown && <NewItemWindow />}
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            {!isLoggedIn && !token && (
              <Route path="/signup" exact>
                <SignUp />
              </Route>
            )}
            {!isLoggedIn && !token && (
              <Route path="/signin" exact>
                <Login />
              </Route>
            )}
            {isLoggedIn && token && (
              <Route path="/week" exact>
                {tasks && <Week tasks={tasks} />}
              </Route>
            )}
            {isLoggedIn && token && (
              <Route path="/week/:day">
                {tasks && <SingleDay tasks={tasks} />}
              </Route>
            )}
            {isLoggedIn && token && (
              <Route path="/todo">
                <GeneralTODO />
              </Route>
            )}
            {isLoggedIn && token && (
              <Route path="*">
                <Redirect to="/" />
              </Route>
            )}
            {!isLoggedIn && !token && (
              <Route path="*">
                <Redirect to="/" />
              </Route>
            )}
          </Switch>
        </Suspense>
      )}
    </Layout>
  );
}

export default App;
