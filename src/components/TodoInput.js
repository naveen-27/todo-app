import React, { useState } from "react";
import classes from "../stylesheets/TodoInput.module.css";

const TodoInput = (props) => {
  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTodo(todo);
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className={classes.Form}>
      <input
        className={classes.Input}
        type="text"
        name="todo"
        value={todo}
        placeholder="Create a new todo..."
        onChange={handleChange}
        aria-label="todo inputbox"
      />
    </form>
  );
};

export default TodoInput;
