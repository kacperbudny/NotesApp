import React from "react";
import styles from "./FullHeightContainer.module.scss";

const FullHeightContainer = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default FullHeightContainer;
