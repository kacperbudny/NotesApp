import React from "react";
import styles from "./IconButton.module.scss";
import PropTypes from "prop-types";

const IconButton = ({ onClick, size = 30, children }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {children}
    </button>
  );
};

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default IconButton;
