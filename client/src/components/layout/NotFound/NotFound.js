import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.centeringContainer}>
      <div className={styles.container}>
        <h1>Oops!</h1>
        <p className={styles.paragraph}>
          We could not find what you're looking for.
        </p>
        <Link to="/">Take me back to the home page</Link>
      </div>
    </div>
  );
};

export default NotFound;
