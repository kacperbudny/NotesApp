import React from "react";
import styles from "./Button.module.scss";

const Button = ({ type = "submit", children }) => {
  return (
    <button className={styles.button} type={type}>
      {children}
    </button>
  );
};

export default Button;
