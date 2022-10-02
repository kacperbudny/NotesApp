import React from "react";
import styles from "./ErrorMessage.module.scss";
import PropTypes from "prop-types";

const ErrorMessage = ({ children, isVisible }) => {
  return isVisible && <p className={styles.message}>{children}</p>;
};

ErrorMessage.propTypes = {
  isVisible: PropTypes.bool,
};

export default ErrorMessage;
