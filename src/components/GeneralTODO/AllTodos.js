import React, { useState, useEffect } from "react";
import classes from "./AllTodos.module.css";
import TodoList from "../GeneralTODO/TodoList";
import AddTodoTask from "./AddTodoTask";
import Button from "../../UI/Button";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../../store/todo-actions";
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
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.todo.todos);
  const updated = useSelector((state) => state.todo.updated);
  const titles = getAllTitles(allTodos);

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(todoActions.todosUnupdate());
  }, [dispatch, updated]);
  return (
    <React.Fragment>
      <Route path="/todo/add">
        <AddTodoTask />
      </Route>
      <div className={classes.all__lists}>
        {titles.map((title) => {
          const titleTodos = allTodos.filter((todo) => todo.title === title);
          return <TodoList title={title} titleTodos={titleTodos} key={title} />;
        })}
        <Button title={"Create New List"} />
      </div>
    </React.Fragment>
  );
}

export default AllTodos;
