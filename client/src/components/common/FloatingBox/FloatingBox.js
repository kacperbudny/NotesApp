import React from "react";
import styles from "./FloatingBox.module.scss";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";

const FloatingBox = ({ onOutsideClick, children }) => {
  return (
    <OutsideClickHandler onOutsideClick={onOutsideClick}>
      <div className={styles.container}>{children}</div>
    </OutsideClickHandler>
  );
};

FloatingBox.propTypes = {
  onOutsideClick: PropTypes.func.isRequired,
};

export default FloatingBox;
