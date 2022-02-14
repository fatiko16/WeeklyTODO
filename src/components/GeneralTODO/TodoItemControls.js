import React from "react";
import classes from "./TodoItemControls.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { todoActions } from "../../store/todo-slice";
import { deleteTodoList } from "../../store/todo-actions";
import { deleteTodo } from "../../store/todo-actions";
import Button from "../../UI/Button";

const getAllTitleTodos = (title, allTodos) => {
  const allTitleTodos = allTodos.filter((todo) => todo.title === title);
  return allTitleTodos;
};

function TodoItemControls(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const allTodos = useSelector((state) => state.todo.todos);
  const allTitleTodos = getAllTitleTodos(props.title, allTodos);
  console.log(allTodos);
  const openNewTodoWindowHandler = () => {
    dispatch(todoActions.chooseTodoList(props.title));
    history.push("/todo/add-todo");
  };
  const deleteListHandler = () => {
    allTitleTodos.forEach((todo) => dispatch(deleteTodo(todo.id)));
    dispatch(deleteTodoList(props.titleID));
    dispatch(todoActions.todosUpdated());
    console.log(allTitleTodos);
  };
  return (
    <div className={classes.controls}>
      <Button
        title={"Add To-Do"}
        className={classes.control}
        onClick={openNewTodoWindowHandler}
      />
      <Button
        title={"Delete List"}
        className={classes.control}
        onClick={deleteListHandler}
      />
    </div>
  );
}

export default TodoItemControls;
