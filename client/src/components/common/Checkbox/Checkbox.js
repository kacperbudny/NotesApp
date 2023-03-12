import React from "react";
import styles from "./Checkbox.module.scss";
import PropTypes from "prop-types";

const Checkbox = ({ name, isChecked = false, onCheck, onUncheck }) => {
  const handleChange = (e) => {
    if (e.currentTarget.checked) {
      onCheck(e);
    } else {
      onUncheck(e);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <input
      type="checkbox"
      name={name}
      className={styles.checkbox}
      checked={isChecked}
      onChange={handleChange}
      onClick={handleClick}
    />
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  onUncheck: PropTypes.func.isRequired,
};

export default Checkbox;
