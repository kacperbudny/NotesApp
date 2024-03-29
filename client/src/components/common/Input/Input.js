import React from "react";
import styles from "./Input.module.scss";
import PropTypes from "prop-types";

const Input = ({ label, name, type, value, onChange, error }) => {
  return (
    <label className={styles.label}>
      {label}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error && styles.error}`}
      />
    </label>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["password", "email"]),
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};

export default Input;
