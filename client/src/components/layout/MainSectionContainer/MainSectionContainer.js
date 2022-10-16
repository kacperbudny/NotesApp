import React from "react";
import styles from "./MainSectionContainer.module.scss";

const MainSectionContainer = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};

export default MainSectionContainer;
