import React, { useState, useEffect } from "react";
import classes from "./AllTodos.module.css";
import TodoList from "../GeneralTODO/TodoList";
import AddTodoTask from "./AddTodoTask";
import Button from "../../UI/Button";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../../store/todo-actions";
import Transition from "react-transition-group/Transition";
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
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(todoActions.todosUnupdate());
  }, [dispatch, updated]);
  return (
    <React.Fragment>
      <Route path="/todo/add">
        <AddTodoTask />
      </Route>
      <Button onClick={() => setShowTransition(!showTransition)}>Toggle</Button>
      <Transition in={showTransition} timeout={1000} mountOnEnter unmountOnExit>
        {(state) => (
          <div
            style={{
              backgroundColor: "red",
              width: 100,
              height: 100,
              margin: "auto",
              transition: "opacity 1s ease-out",
              opacity: state === "exiting" ? 0 : 1,
            }}
          ></div>
        )}
      </Transition>
      <div className={classes.all__lists}>
        {allTodos && allTodos.length > 0 && allTodos.map((todo) => {})}
        <TodoList title={"Weekly TO DO"} />
        <TodoList title={"CSS"} />
        <TodoList title={"Algorithms"} />
        <TodoList title={"Daily Life"} />
        <Button title={"Create New List"} />
      </div>
    </React.Fragment>
  );
}

export default AllTodos;
