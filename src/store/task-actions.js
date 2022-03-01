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
} from "firebase/firestore";
import { taskActions } from "./task-slice";
const tasksCollectionRef = collection(db, "tasks");
const usersCollectionRef = collection(db, "users");

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
      console.log("Something went wrong while getting your todos.");
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

export const addTaskToUser = (day, title, duration, userUID) => {
  return async () => {
    try {
    } catch (error) {}
  };
};

export const getUserData = (userUID) => {
  return async () => {
    try {
      const q = query(tasksCollectionRef, where("userID", "==", userUID));
      const userTasks = await getDocs(q);
      userTasks.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });

      console.log(userTasks.data);
    } catch (error) {
      console.log(error);
      console.log("Encountered error while pulling user data");
    }
  };
};
