import { db } from "../firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { taskActions } from "./task-slice";
import { uiActions } from "./ui-slice";
const tasksCollectionRef = collection(db, "tasks");

//-----------------------------------------------------EVERYTHING ON USER----------------------------------------
export const deleteTask = (id) => {
  return async (dispatch) => {
    try {
      const taskDoc = doc(db, "tasks", id);
      await deleteDoc(taskDoc);
      dispatch(taskActions.tasksUpdated);
    } catch (error) {
      console.log(error);
      console.log("Something went wrong while deleting the task");
    }
  };
};

export const toggleTaskDone = (id, currentValue) => {
  return async () => {
    const taskDoc = doc(db, "tasks", id);
    const newFields = { isDone: !currentValue };
    await updateDoc(taskDoc, newFields);
  };
};

export const updateTask = (id, title, duration) => {
  return async (dispatch) => {
    console.log(id, title, duration);
    const taskDoc = doc(db, "tasks", id);
    const newFields = { title: title, duration: duration };
    dispatch(taskActions.updateNewDuration(duration));
    await updateDoc(taskDoc, newFields);
  };
};

export const addTaskToUser = (day, title, duration, userUID) => {
  return async () => {
    try {
      await addDoc(tasksCollectionRef, {
        day: day,
        title: title,
        duration: duration,
        isDone: false,
        userUID: userUID,
        created: Timestamp.now().seconds,
      });
    } catch (error) {
      console.log(error);
      console.log("Something went wrong while creating an task");
    }
  };
};

export const getUserData = (userUID) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.startedLoading());
      if (userUID) {
        const q = query(
          tasksCollectionRef,
          where("userUID", "==", userUID),
          orderBy("created")
        );
        const userTasksData = await getDocs(q);
        const userTasks = userTasksData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(taskActions.replaceTasks(userTasks));
      }
    } catch (error) {
      console.log(error);
      console.log("Encountered error while pulling user data");
    } finally {
      dispatch(uiActions.finishedLoading());
    }
  };
};
