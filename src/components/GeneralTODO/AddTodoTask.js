import React from "react";
import { useHistory } from "react-router-dom";
import Modal from "../../UI/Modal";
import TodoForm from "./TodoForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createTodo } from "../../store/todo-actions";
import { todoActions } from "../../store/todo-slice";
function AddTodoTask() {
  const history = useHistory();
  const dispatch = useDispatch();
  const todoInfo = useSelector((state) => state.todo);

  const closeModalHandler = () => {
    history.push("/todo");
  };
  const submitHandler = (description) => {
    dispatch(createTodo(todoInfo.title, description));
    dispatch(todoActions.todosUpdated());
    closeModalHandler();
  };
  return (
    <Modal onClose={closeModalHandler}>
      <TodoForm onClose={closeModalHandler} onSubmit={submitHandler} />
    </Modal>
  );
}

export default AddTodoTask;
