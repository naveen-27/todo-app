import React from "react";
import { ReactComponent as Check } from "../images/icon-check.svg";
import Cross from "../images/icon-cross.svg";
import classes from "../stylesheets/Todo.module.css";

const Todo = (props) => {
  const { todo, isDone } = props.todo;
  const todoCheckedClassName = isDone ? classes.checked : "";
  const todoCompletedClassName = isDone ? classes.done : "";

  const isClickedOrEnterPressed = (e) => {
    const isEnterKeyPressed = e.type === "keydown" && e.keyCode === 13;
    const isMouseClicked = e.type === "click";

    return isEnterKeyPressed || isMouseClicked;
  };

  const handleToggleClick = (e) => {
    if (isClickedOrEnterPressed(e)) {
      props.toggleDone(props.index);
    }
  };

  const handleDelete = (e) => {
    if (isClickedOrEnterPressed(e)) {
      e.target.parentElement.classList.add(classes.deleting);
    }
  };

  const deleteTodo = (e) => {
    if (/.*_fadeOut_/.test(e.animationName)) {
      props.delete(props.index);
    }
  };

  return (
    <div className={classes.Todo} onAnimationEnd={deleteTodo}>
      <div
        className={classes.checkbox}
        tabIndex="0"
        onClick={handleToggleClick}
        onKeyDown={handleToggleClick}
        role="checkbox"
        aria-checked={isDone}
        aria-labelledby={todo}
      >
        <div className={`${classes.check} ${todoCheckedClassName}`}>
          <Check />
        </div>
      </div>

      <p
        className={`${classes["todo-content"]} ${todoCompletedClassName}`}
        onClick={handleToggleClick}
      >
        {todo}
      </p>

      <img
        src={Cross}
        alt=""
        className={classes.delete}
        tabIndex="0"
        onClick={handleDelete}
        onKeyDown={handleDelete}
      />
    </div>
  );
};

export default Todo;
