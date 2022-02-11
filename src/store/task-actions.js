import { db } from "../firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { taskActions } from "./task-slice";
const tasksCollectionRef = collection(db, "tasks");

// export const sendTaskData = (cart) => {
//   return async (dispatch) => {
//     const sendRequest = async () => {
//       const response = await fetch(
//         "https://weeklytodo-87197-default-rtdb.firebaseio.com/cart.json",
//         {
//           method: "PUT",
//           body: JSON.stringify(cart),
//         }
//       );

//       if (!response) {
//         throw new Error("Sending Cart Data failed");
//       }
//     };
//     try {
//       await sendRequest();
//     } catch (error) {}
//   };
// };

export const fetchTasks = () => {
  return async (dispatch) => {
    try {
      const data = await getDocs(tasksCollectionRef);
      const tasks = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(taskActions.replaceTasks(tasks));
    } catch (error) {
      console.log("Something went wrong while getting your tasks.");
    }
  };
};

// const createTaskHandler = async (day, title, duration) => {
//   await addDoc(usersCollectionRef, {
//     day: day,
//     title: title,
//     duration: duration,
//     isDone: false,
//   });
//   setUploaded(true);
// };
export const createTask = (day, title, duration) => {
  return async () => {
    try {
      await addDoc(tasksCollectionRef, {
        day: day,
        title: title,
        duration: duration,
        isDone: false,
      });
    } catch (error) {
      console.log(error);
      console.log("Something went wrong while creating an task");
    }
  };
};
// const deleteTaskHandler = async (id) => {const userDoc = doc(db, "tasks", id);deleteDoc(userDoc); setUploaded(true)};

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
// const checkTaskDoneHandler = async (id, currentValue) => {
//     const taskDoc = doc(db, "tasks", id);
//     const newFields = { isDone: !currentValue };
//     await updateDoc(taskDoc, newFields);
//     setUploaded(true);
//   };

export const toggleTaskDone = (id, currentValue) => {
  return async () => {
    const taskDoc = doc(db, "tasks", id);
    const newFields = { isDone: !currentValue };
    await updateDoc(taskDoc, newFields);
  };
};

export const updateTask = (id, title, duration) => {
  return async () => {
    console.log(id, title, duration);
    const taskDoc = doc(db, "tasks", id);
    const newFields = { title: title, duration: duration };
    await updateDoc(taskDoc, newFields);
  };
};
