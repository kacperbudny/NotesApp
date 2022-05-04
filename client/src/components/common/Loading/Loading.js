import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <FontAwesomeIcon icon={faCircleNotch} spin size="5x" />
    </div>
  );
};

export default Loading;
