import React from "react";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";

const Button = ({ type = "submit", children }) => {
  return (
    <button className={styles.button} type={type}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
};

export default Button;
