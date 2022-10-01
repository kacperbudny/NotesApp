import React from "react";
import styles from "./ErrorMessage.module.scss";

const ErrorMessage = ({ children, isVisible }) => {
  return isVisible && <p className={styles.message}>{children}</p>;
};

export default ErrorMessage;
