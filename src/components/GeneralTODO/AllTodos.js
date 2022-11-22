import React, { useEffect } from "react";
import classes from "./AllTodos.module.css";
import TodoList from "../GeneralTODO/TodoList";
import AddTodoList from "./AddTodoList";
import AddTodoTask from "./AddTodoTask";
import Button from "../../UI/Button";
import { Route, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../../store/todo-actions";
import { fetchTitles } from "../../store/todo-actions";
import { useSelector } from "react-redux";
import { todoActions } from "../../store/todo-slice";
import LoadingSpinner from "../../UI/LoadingSpinner";

//CONTINUE RENDERING ALL LISTS
function AllTodos() {
  const history = useHistory();
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.todo.todos);
  const allTitles = useSelector((state) => state.todo.allTitles);
  const updated = useSelector((state) => state.todo.updated);
  const userUID = useSelector((state) => state.auth.userUID);
  const loading = useSelector((state) => state.ui.loading);
  useEffect(() => {
    dispatch(fetchTodos(userUID));
    dispatch(fetchTitles(userUID));
    dispatch(todoActions.todosUnupdate());
  }, [dispatch, updated, userUID]);
  return (
    <React.Fragment>
      <Route path="/todo/add-list">
        <AddTodoList />
      </Route>
      <Route path="/todo/add-todo">
        <AddTodoTask />
      </Route>
      {loading && <LoadingSpinner />}
      {!loading && (
        <div className={classes.all__lists}>
          {allTitles &&
            allTitles.length > 0 &&
            allTitles.map((titleDoc) => {
              const titleTodos = allTodos.filter(
                (todo) => todo.title === titleDoc.title
              );
              return (
                <TodoList
                  title={titleDoc.title}
                  titleTodos={titleTodos}
                  key={titleDoc.title}
                  id={titleDoc.id}
                />
              );
            })}
          <Button
            title={"Create New List"}
            onClick={() => history.push("/todo/add-list")}
            className={classes.btn}
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default AllTodos;
