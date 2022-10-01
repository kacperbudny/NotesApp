import React from "react";
import styles from "./Input.module.scss";

const Input = ({ label, name, type, value, onChange }) => {
  return (
    <label className={styles.label}>
      {label}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </label>
  );
};

export default Input;
