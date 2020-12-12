import React from "react";
import { ReactComponent as Sun } from "../images/icon-sun.svg";
import { ReactComponent as Moon } from "../images/icon-moon.svg";
import classes from "../stylesheets/Header.module.css";

const Header = (props) => {
  const ThemeSwitchIcon = props.theme === "light" ? Moon : Sun;

  return (
    <header className={classes.Header}>
      <h1 className={classes.logo}>TODO</h1>
      <ThemeSwitchIcon onClick={props.themeToggleFn} />
    </header>
  );
};

export default Header;
