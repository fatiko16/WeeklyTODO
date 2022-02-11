import React from "react";
import Modal from "../../UI/Modal";
import DayTaskForm from "./DayTaskForm";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { createTask } from "../../store/task-actions";
import { updateTask } from "../../store/task-actions";
import { taskActions } from "../../store/task-slice";
function NewItemWindow() {
  const dispatch = useDispatch();
  const day = useSelector((state) => state.ui.day);
  const title = useSelector((state) => state.ui.title);
  const duration = useSelector((state) => state.ui.duration);
  const uiState = useSelector((state) => state.ui);
  const hideModalHandler = () => {
    dispatch(uiActions.hideNewItemWindow());
  };

  const submitHandler = (title, duration) => {
    if (uiState.id.length === 0) {
      console.log(uiState);
      dispatch(createTask(day, title, duration));
      dispatch(taskActions.tasksUpdated());
    } else if (uiState.id.length > 0) {
      dispatch(updateTask(uiState.id, title, duration));
      dispatch(taskActions.tasksUpdated());
    }
    hideModalHandler();
  };
  return (
    <Modal onClose={hideModalHandler}>
      <DayTaskForm
        onSubmit={submitHandler}
        title={title}
        duration={duration}
        isEditing={uiState.id.length > 0 ? true : false}
      />
    </Modal>
  );
}

export default NewItemWindow;
