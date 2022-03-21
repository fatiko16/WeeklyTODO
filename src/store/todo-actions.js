import { db } from "../firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { todoActions } from "./todo-slice";
const todoCollectionRef = collection(db, "todos");
const todoTitleCollectionRef = collection(db, "titles");

export const createTodo = (title, description, userUID) => {
  return async () => {
    try {
      await addDoc(todoCollectionRef, {
        title: title,
        description: description,
        userUID: userUID,
        created: Timestamp.now().seconds,
      });
    } catch (error) {
      console.log(error);
      console.log("Something went wrong while creating an todo");
    }
  };
};

export const fetchTodos = (userUID) => {
  return async (dispatch) => {
    try {
      const q = query(
        todoCollectionRef,
        where("userUID", "==", userUID),
        orderBy("created")
      );
      const data = await getDocs(q);
      const todos = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(todoActions.replaceTodos(todos));
    } catch (error) {
      console.log("Something went wrong while getting your todos.");
    }
  };
};

export const deleteTodo = (id) => {
  return async (dispatch) => {
    try {
      const todoDoc = doc(db, "todos", id);
      await deleteDoc(todoDoc);
      dispatch(todoActions.todosUpdated);
    } catch (error) {
      console.log(error);
      console.log("Something went wrong while deleting the todo");
    }
  };
};

export const addTodoList = (title, userUID) => {
  return async () => {
    try {
      await addDoc(todoTitleCollectionRef, {
        title: title,
        userUID: userUID,
        created: Timestamp.now().seconds,
      });
    } catch (error) {
      console.log(error);
      console.log("Something went wrong while adding To do list");
    }
  };
};

export const deleteTodoList = (id) => {
  return async () => {
    try {
      const todoList = doc(db, "titles", id);
      await deleteDoc(todoList);
    } catch (error) {
      console.log(error);
      console.log("Something went wrong while deleting a to do list");
    }
  };
};

export const fetchTitles = (userUID) => {
  return async (dispatch) => {
    try {
      const q = query(
        todoTitleCollectionRef,
        where("userUID", "==", userUID),
        orderBy("created")
      );
      const data = await getDocs(q);
      const todoTitles = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(todoActions.replaceTodoTitles(todoTitles));
    } catch (error) {
      console.log(error);
      console.log("Something went wrong while fetching to do list titles");
    }
  };
};
