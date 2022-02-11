import React from "react";
import Modal from "../../UI/Modal";
import DayTaskForm from "./DayTaskForm";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { createTask } from "../../store/task-actions";
import { taskActions } from "../../store/task-slice";
function EditDayTaskWindow() {
  const dispatch = useDispatch();
  const hideModalHandler = () => {
    dispatch(uiActions.hideNewItemWindow());
  };

  const submitHandler = (title, duration) => {};
  return (
    <Modal onClose={hideModalHandler}>
      <DayTaskForm onSubmit={submitHandler} />
    </Modal>
  );
}

export default EditDayTaskWindow;
