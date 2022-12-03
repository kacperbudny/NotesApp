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

  return (
    <input
      type="checkbox"
      name={name}
      className={styles.checkbox}
      checked={isChecked}
      onChange={handleChange}
    />
  );
};

Checkbox.propTypes = {
  name: PropTypes.string,
  isChecked: PropTypes.bool,
  onCheck: PropTypes.func,
  onUncheck: PropTypes.func,
};

export default Checkbox;
