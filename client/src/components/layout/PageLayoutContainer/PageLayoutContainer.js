import React from "react";
import styles from "./PageLayoutContainer.module.scss";

const PageLayoutContainer = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default PageLayoutContainer;
