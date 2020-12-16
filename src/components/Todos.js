import { React, useState, useRef } from "react";
import Todo from "./Todo";
import classes from "../stylesheets/Todos.module.css";

const Todos = (props) => {
  const [dragging, setDragging] = useState("");
  const prevY = useRef(0);
  const movedY = useRef(0);
  const moved = useRef(0);

  const handleMouseDown = (e) => {
    if (e.target.nodeName === "SPAN") {
      const target = e.target.parentElement;

      target.classList.add(`${classes.dragging}`);
      target.style.transform = `scale(1.05) translateY(${
        parseInt(target.dataset.transform) * 100
      }%)`;

      setDragging(e.target.parentElement);
      prevY.current = e.clientY;
      movedY.current = e.clientY;
    }
  };

  const handleMouseUp = () => {
    if (dragging !== "") {
      dragging.classList.remove(`${classes.dragging}`);
      dragging.style.transform = `scale(1) translateY(${
        parseInt(dragging.dataset.transform) * 100
      }%)`;

      setDragging("");
      prevY.current = 0;
      movedY.current = 0;

      const newOrder = Array.from(
        document.querySelectorAll(`.${classes.Todos} > *`)
      ).map((todo) => {
        todo.style.transform = "translateY(0)";
        todo.dataset.transform = 0;
        return parseInt(todo.dataset.position);
      });

      props.reOrder(newOrder);
    }
  };

  const handleMouseMove = (e) => {
    if (dragging === "") {
      return;
    }

    const dragDistance = e.clientY - prevY.current;
    dragging.style.transform = `scale(1.05) translateY(${dragDistance}px)`;

    const distanceDraggedAfterSwap = e.clientY - movedY.current;

    const canMakeNonFirstMove =
      moved.current > 0 && Math.abs(distanceDraggedAfterSwap) >= 50;
    const canMakeFirstMove =
      moved.current === 0 && Math.abs(dragDistance) >= 22;
    const canMakeMove = canMakeFirstMove || canMakeNonFirstMove;

    if (
      prevY.current < e.clientY &&
      parseInt(dragging.dataset.position) !== props.todos.length - 1
    ) {
      if (canMakeMove) {
        const target = document.querySelector(
          `div[data-position='${parseInt(dragging.dataset.position) + 1}']`
        );
        target.style.transform = `translateY(${
          (parseInt(target.dataset.transform) - 1) * 100
        }%)`;

        target.dataset.position = parseInt(target.dataset.position) - 1;
        dragging.dataset.position = parseInt(dragging.dataset.position) + 1;
        target.dataset.transform = parseInt(target.dataset.transform) - 1;
        dragging.dataset.transform = parseInt(dragging.dataset.transform) + 1;
        moved.current++;
        movedY.current = e.clientY;
      }
    } else if (
      prevY.current > e.clientY &&
      parseInt(dragging.dataset.position) !== 0
    ) {
      if (canMakeMove) {
        const target = document.querySelector(
          `div[data-position='${parseInt(dragging.dataset.position) - 1}']`
        );
        target.style.transform = `translateY(${
          (parseInt(target.dataset.transform) + 1) * 100
        }%)`;

        target.dataset.position = parseInt(target.dataset.position) + 1;
        dragging.dataset.position = parseInt(dragging.dataset.position) - 1;
        target.dataset.transform = parseInt(target.dataset.transform) + 1;
        dragging.dataset.transform = parseInt(dragging.dataset.transform) - 1;
        moved.current++;
        movedY.current = e.clientY;
      }
    }
  };

  const handleDragAndDrop = {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  };

  return (
    <div className={classes.Todos}>
      {props.todos.map((todoContent, idx) => (
        <Todo
          todo={todoContent}
          key={todoContent.id}
          index={idx}
          toggleDone={props.toggleDone}
          delete={props.delete}
          dragAndDrop={handleDragAndDrop}
        />
      ))}
    </div>
  );
};

export default Todos;
