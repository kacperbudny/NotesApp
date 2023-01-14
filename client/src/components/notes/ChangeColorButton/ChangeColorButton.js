import React from "react";
import styles from "./ChangeColorButton.module.scss";
import PropTypes from "prop-types";
import COLORS from "@utils/constants/colors";

const ChangeColorButton = ({ color, changeColor }) => {
  const handleClick = (e) => {
    e.preventDefault();
    changeColor(color);
  };

  return (
    <button
      className={`${styles.colorButton} ${
        color === COLORS.white && styles.border
      }`}
      style={{ background: `${color}` }}
      onClick={handleClick}
    ></button>
  );
};

ChangeColorButton.propTypes = {
  color: PropTypes.string,
  changeColor: PropTypes.func.isRequired,
};

export default ChangeColorButton;
