import React, { useState } from "react";
import Header from "./Header";
import getBackgroundImage from "../utilites/GetBackgroundImage";
import classes from "../stylesheets/TodoApp.module.css";

const TodoApp = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const changedTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", changedTheme);
    setTheme(changedTheme);
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
      </div>
    </div>
  );
};

export default TodoApp;
