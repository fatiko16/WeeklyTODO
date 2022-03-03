import React from "react";
import { useHistory } from "react-router-dom";

import Modal from "../../UI/Modal";
import TodoListForm from "./TodoListForm";
function AddTodoList() {
  const history = useHistory();

  const closeModalHandler = () => {
    history.push("/todo");
  };
  return (
    <Modal onClose={closeModalHandler}>
      <TodoListForm onClose={closeModalHandler} />
    </Modal>
  );
}

export default AddTodoList;
