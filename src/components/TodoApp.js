import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Header from "./Header";
import TodoInput from "./TodoInput";
import getBackgroundImage from "../utilites/GetBackgroundImage";
import classes from "../stylesheets/TodoApp.module.css";

const TodoApp = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const toggleTheme = () => {
    const changedTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", changedTheme);
    setTheme(changedTheme);
  };

  const addTodo = (todoContent) => {
    const newTodo = {
      id: uuid(),
      todo: todoContent,
      isDone: false,
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <div
      className={classes["App-container"]}
      data-theme={theme}
      style={{
        backgroundImage: `url(${getBackgroundImage(window.innerWidth, theme)})`,
      }}
    >
      <div className={classes["Todo-wrapper"]}>
        <Header theme={theme} themeToggleFn={toggleTheme} />
        <TodoInput addTodo={addTodo} />
      </div>
    </div>
  );
};

export default TodoApp;
