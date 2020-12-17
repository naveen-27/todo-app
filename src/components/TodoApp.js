import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Header from "./Header";
import TodoInput from "./TodoInput";
import getBackgroundImage from "../utilites/GetBackgroundImage";
import classes from "../stylesheets/TodoApp.module.css";
import Todos from "./Todos";
import OptionPanel from "./OptionPanel";

const TodoApp = () => {
  const firstRenderTodos = [
    {
      id: uuid(),
      todo: "Complete online JavaScript course",
      isDone: true,
    },
    {
      id: uuid(),
      todo: "Jog around the park 3x",
      isDone: false,
    },
    {
      id: uuid(),
      todo: "10 minutes meditation",
      isDone: false,
    },
    {
      id: uuid(),
      todo: "Read for 1 hour",
      isDone: false,
    },
    {
      id: uuid(),
      todo: "Pick up groceries",
      isDone: false,
    },
    {
      id: uuid(),
      todo: "Complete Todo App on Frontend Mentor",
      isDone: false,
    },
  ];

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || firstRenderTodos
  );
  const [filter, setFilter] = useState("all");

  const toggleTheme = () => {
    const changedTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", changedTheme);
    setTheme(changedTheme);
  };

  const addTodo = (todoContent) => {
    if (todoContent === "") return;

    const newTodo = {
      id: uuid(),
      todo: todoContent,
      isDone: false,
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const toggleDone = (idx) => {
    const modifiedTodos = [...todos];
    modifiedTodos[idx].isDone = !modifiedTodos[idx].isDone;
    setTodos(modifiedTodos);
    localStorage.setItem("todos", JSON.stringify(modifiedTodos));
  };

  const deleteTodo = (idx) => {
    const modifiedTodos = [
      ...todos.slice(0, idx),
      ...todos.slice(idx + 1, todos.length),
    ];
    setTodos(modifiedTodos);
    localStorage.setItem("todos", JSON.stringify(modifiedTodos));
  };

  const changeFilter = (option) => {
    setFilter(option);
  };

  const filterTodo = () => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.isDone);
    } else if (filter === "completed") {
      return todos.filter((todo) => todo.isDone);
    } else {
      return todos;
    }
  };

  const clearCompleted = () => {
    const modifiedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(modifiedTodos);
    localStorage.setItem("todos", JSON.stringify(modifiedTodos));
  };

  const getRemainingTodos = () => {
    return todos.reduce((remaining, todo) => {
      if (!todo.isDone) {
        return remaining + 1;
      } else {
        return remaining;
      }
    }, 0);
  };

  const reOrderTodos = (newOrder) => {
    let newTodosOrder = new Array(todos.length);
    newOrder.forEach((position, idx) => {
      newTodosOrder[position] = todos[idx];
    });

    setTodos(newTodosOrder);
    localStorage.setItem("todos", JSON.stringify(newTodosOrder));
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

        <Todos
          todos={filterTodo()}
          filter={filter}
          toggleDone={toggleDone}
          delete={deleteTodo}
          reOrder={reOrderTodos}
        />

        <OptionPanel
          clearCompleted={clearCompleted}
          changeFilter={changeFilter}
          remainingTodos={getRemainingTodos()}
          filterApplied={filter}
        />

        <p className={classes.help}>
          Drag and drop to reorder list. One direction at a time
        </p>

        <p className={classes.citation}>
          Challenge by{" "}
          <a href="https://www.frontendmentor.io/?ref=challenge">
            Frontend Mentor
          </a>
          . Coded by <a href="https://www.github.com/naveen-27">Naveen</a>.
        </p>
      </div>
    </div>
  );
};

export default TodoApp;
