import React from "react";
import styles from "./CenteredContainer.module.scss";

const CenteredContainer = ({ children }) => {
  return (
    <div className={styles.centeringContainer}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default CenteredContainer;
