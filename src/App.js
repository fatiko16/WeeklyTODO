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
import GeneralTODO from "./components/Pages/GeneralTODO";
const Week = React.lazy(() => import("./components/Week/Week"));
function App() {
  const dispatch = useDispatch();
  const isNewItemWindowShown = useSelector(
    (state) => state.ui.isNewItemWindowShown
  );
  const tasks = useSelector((state) => state.task.tasks);
  const changed = useSelector((state) => state.task.changed);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(taskActions.tasksNoUpdate());
  }, [changed, dispatch]);

  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>
        {isNewItemWindowShown && <NewItemWindow />}
        <Switch>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/week" exact>
            {tasks && <Week tasks={tasks} />}
          </Route>
          {/* <Route path="/todo" exact>
            {tasks && <Week tasks={tasks} />}
          </Route> */}
          <Route path="/week/:day">
            {tasks && <SingleDay tasks={tasks} />}
          </Route>
          <Route path="/todo">
            <GeneralTODO />
          </Route>
          <Route path="/" exact>
            <Redirect to="/week" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
