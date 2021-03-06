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

  const { handleMouseDown, handleMouseUp, handleMouseMove } = props.dragAndDrop;

  return (
    <div
      className={classes.Todo}
      data-position={props.index}
      data-transform={0}
      onAnimationEnd={deleteTodo}
      onMouseDown={!("ontouchstart" in window) ? handleMouseDown : undefined}
      onMouseUp={!("ontouchstart" in window) ? handleMouseUp : undefined}
      onMouseMove={!("ontouchstart" in window) ? handleMouseMove : undefined}
      onTouchStart={"ontouchstart" in window ? handleMouseDown : undefined}
      onTouchMove={"ontouchstart" in window ? handleMouseMove : undefined}
      onTouchEnd={"ontouchstart" in window ? handleMouseUp : undefined}
    >
      <div
        className={classes.checkbox}
        tabIndex="0"
        onClick={handleToggleClick}
        onKeyDown={handleToggleClick}
        role="checkbox"
        aria-checked={isDone}
        aria-labelledby={`todo-no${props.index}`}
      >
        <div className={`${classes.check} ${todoCheckedClassName}`}>
          <Check />
        </div>
      </div>

      <p
        id={`todo-no${props.index}`}
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

      <span className={classes.Drag}></span>
    </div>
  );
};

export default Todo;
