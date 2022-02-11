import React from "react";
import Modal from "../../UI/Modal";
import TodoForm from "./TodoForm";
function AddTodoTask() {
  return (
    <Modal>
      <TodoForm />
    </Modal>
  );
}

export default AddTodoTask;
