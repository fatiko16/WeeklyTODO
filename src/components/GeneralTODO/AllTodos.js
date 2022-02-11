import React, { useState } from "react";
import classes from "./AllTodos.module.css";
import TodoList from "../GeneralTODO/TodoList";
import Button from "../../UI/Button";
import Transition from "react-transition-group/Transition";
function AllTodos() {
  const [showTransition, setShowTransition] = useState(false);
  return (
    <React.Fragment>
      <Button onClick={() => setShowTransition(!showTransition)}>Toggle</Button>
      <Transition in={showTransition} timeout={1000} mountOnEnter unmountOnExit>
        {(state) => (
          <div
            style={{
              backgroundColor: "red",
              width: 100,
              height: 100,
              margin: "auto",
              transition: "opacity 1s ease-out",
              opacity: state === "exiting" ? 0 : 1,
            }}
          ></div>
        )}
      </Transition>
      <div className={classes.all__lists}>
        <TodoList title={"Weekly TO DO"} />
        <TodoList title={"CSS"} />
        <TodoList title={"Algorithms"} />
        <TodoList title={"Daily Life"} />
        <Button title={"Create New List"} />
      </div>
    </React.Fragment>
  );
}

export default AllTodos;
