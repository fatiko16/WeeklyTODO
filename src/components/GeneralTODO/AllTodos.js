import React, { useState, useEffect } from "react";
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

const getAllTitles = (todos) => {
  const titles = todos.map((todo) => todo.title);
  const filteredTitles = titles.filter(
    (value, index, self) => self.indexOf(value) === index
  );
  return filteredTitles;
};
//CONTINUE RENDERING ALL LISTS
function AllTodos() {
  const history = useHistory();
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.todo.todos);
  const allTitles = useSelector((state) => state.todo.allTitles);
  const updated = useSelector((state) => state.todo.updated);
  const titles = getAllTitles(allTodos);

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchTitles());
    dispatch(todoActions.todosUnupdate());
  }, [dispatch, updated]);
  return (
    <React.Fragment>
      <Route path="/todo/add-list">
        <AddTodoList />
      </Route>
      <Route path="/todo/add-todo">
        <AddTodoTask />
      </Route>
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
        />
      </div>
    </React.Fragment>
  );
}

export default AllTodos;
