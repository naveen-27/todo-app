import React from "react";
import classes from "../stylesheets/OptionPanel.module.css";

const OptionPanel = (props) => {
  return (
    <div className={classes.Panel}>
      <p>
        <span className={classes.no}>{props.remainingTodos}</span> items left
      </p>

      <div className={classes.filter}>
        <button
          tabIndex={0}
          className={`${classes.option} ${
            props.filterApplied === "all" ? classes.active : ""
          }`}
          onClick={() => props.changeFilter("all")}
        >
          All
        </button>
        <button
          tabIndex={0}
          className={`${classes.option} ${
            props.filterApplied === "active" ? classes.active : ""
          }`}
          onClick={() => props.changeFilter("active")}
        >
          Active
        </button>
        <button
          tabIndex={0}
          className={`${classes.option} ${
            props.filterApplied === "completed" ? classes.active : ""
          }`}
          onClick={() => props.changeFilter("completed")}
        >
          Completed
        </button>
      </div>

      <button onClick={props.clearCompleted} className={classes.btn}>
        Clear Completed
      </button>
    </div>
  );
};

export default OptionPanel;
