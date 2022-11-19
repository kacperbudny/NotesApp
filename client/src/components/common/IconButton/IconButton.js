import React from "react";
import styles from "./IconButton.module.scss";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = ({ onClick, size = 30, icon, iconSize }) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <FontAwesomeIcon icon={icon} size={iconSize} />
    </button>
  );
};

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.object.isRequired,
  iconSize: PropTypes.string,
};

export default IconButton;
