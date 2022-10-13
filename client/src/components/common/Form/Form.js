import React from "react";
import styles from "./Form.module.scss";
import PropTypes from "prop-types";

const Form = ({ children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {children}
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
};

export default Form;
