import FloatingBox from "@components/common/FloatingBox/FloatingBox";
import React from "react";
import PropTypes from "prop-types";
import styles from "./TaggingBox.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const TaggingBox = ({ setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <FloatingBox onOutsideClick={handleClose}>
      <div className={styles.container}>
        <h4 className={styles.header}>Tag note</h4>
        <div className={styles.inputWithIconContainer}>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter a tag"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="xs"
            className={styles.icon}
          />
        </div>
        <ul></ul>
      </div>
    </FloatingBox>
  );
};

TaggingBox.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};

export default TaggingBox;
