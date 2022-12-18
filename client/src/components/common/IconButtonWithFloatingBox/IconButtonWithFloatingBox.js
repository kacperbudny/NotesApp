import React from "react";
import styles from "./IconButtonWithFloatingBox.module.scss";
import PropTypes from "prop-types";
import IconButton from "@components/common/IconButton";

const IconButtonWithFloatingBox = ({ isOpen, setIsOpen, icon, children }) => {
  const handleIconClick = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.relativeContainer}>
      <IconButton onClick={handleIconClick} icon={icon} />
      {isOpen && children}
    </div>
  );
};

IconButtonWithFloatingBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
};

export default IconButtonWithFloatingBox;
