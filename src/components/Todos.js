import React from "react";
import Todo from "./Todo";
import classes from "../stylesheets/Todos.module.css";

const Todos = (props) => {
  return (
    <div className={classes.Todos}>
      {props.todos.map((todoContent, idx) => (
        <Todo
          todo={todoContent}
          key={todoContent.id}
          index={idx}
          toggleDone={props.toggleDone}
          delete={props.delete}
        />
      ))}
    </div>
  );
};

export default Todos;
