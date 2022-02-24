import { db } from "../firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { todoActions } from "./todo-slice";
const todoCollectionRef = collection(db, "todos");
const todoTitleCollectionRef = collection(db, "titles");

export const createTodo = (title, description) => {
  return async () => {
    try {
      await addDoc(todoCollectionRef, {
        title: title,
        description: description,
      });
    } catch (error) {
      console.log(error);
      console.log("Something went wrong while creating an todo");
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

export const addTodoList = (title) => {
  return async () => {
    try {
      await addDoc(todoTitleCollectionRef, {
        title: title,
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

export const fetchTitles = () => {
  return async (dispatch) => {
    try {
      const data = await getDocs(todoTitleCollectionRef);
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
