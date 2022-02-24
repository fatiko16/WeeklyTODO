import React, { useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTasks } from "./store/task-actions";
import { taskActions } from "./store/task-slice";
import { Route, Redirect, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import SingleDay from "./components/Day/SingleDay";
import NewItemWindow from "./components/Day/NewItemWindow";
import SignUp from "./components/Pages/SignUp";
import Login from "./components/Pages/Login";
import GeneralTODO from "./components/Pages/GeneralTODO";
import HomePage from "./components/Pages/HomePage";
import { logoutTimer, updateTimer } from "./store/auth-actions";
import { authActions } from "./store/auth-slice";
import { retrieveStoredTokendData } from "./store/auth-actions";
const Week = React.lazy(() => import("./components/Week/Week"));
function App() {
  const dispatch = useDispatch();
  const isNewItemWindowShown = useSelector(
    (state) => state.ui.isNewItemWindowShown
  );
  const tasks = useSelector((state) => state.task.tasks);
  const changed = useSelector((state) => state.task.changed);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(taskActions.tasksNoUpdate());
  }, [changed, dispatch]);
  const tokenData = dispatch(retrieveStoredTokendData());
  const token = tokenData.token;
  const remainingTime = tokenData.duration;
  useEffect(() => {
    console.log("First of all hiya from tokenRefresher");
    if (token) {
      dispatch(authActions.login(token));
      dispatch(updateTimer(remainingTime - 50 * 60 * 1000));
    }
  }, [dispatch, token, remainingTime]);
  console.log(logoutTimer);
  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>
        {isNewItemWindowShown && <NewItemWindow />}
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          {!isLoggedIn && (
            <Route path="/signup" exact>
              <SignUp />
            </Route>
          )}
          {!isLoggedIn && (
            <Route path="/signin" exact>
              <Login />
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/week" exact>
              {tasks && <Week tasks={tasks} />}
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/week/:day">
              {tasks && <SingleDay tasks={tasks} />}
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/todo">
              <GeneralTODO />
            </Route>
          )}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
