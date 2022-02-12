import { db } from "../firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { todoActions } from "./todo-slice";
const todoCollectionRef = collection(db, "todos");

export const createTodo = (title, description) => {
  return async () => {
    try {
      await addDoc(todoCollectionRef, {
        title: title,
        description: description,
      });
    } catch (error) {
      console.log(error);
      console.log("Something went wrong while creating an task");
    }
  };
};

export const fetchTodos = () => {
  return async (dispatch) => {
    try {
      const data = await getDocs(todoCollectionRef);
      const todos = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(todoActions.replaceTodos(todos));
    } catch (error) {
      console.log("Something went wrong while getting your todos.");
    }
  };
};
