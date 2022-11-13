import React from "react";
import styles from "./ChangeColorButton.module.scss";
import PropTypes from "prop-types";

const ChangeColorButton = ({ color, changeColor }) => {
  const handleClick = (e) => {
    e.preventDefault();

    if (!color) {
      color = "white";
    }

    changeColor(color);
  };

  return (
    <button
      className={styles.colorButton}
      style={
        color
          ? { background: `${color}` }
          : { background: "white", border: "2px solid #ccc" }
      }
      onClick={(e) => handleClick(e)}
    ></button>
  );
};

ChangeColorButton.propTypes = {
  color: PropTypes.string,
  changeColor: PropTypes.func.isRequired,
};

export default ChangeColorButton;
