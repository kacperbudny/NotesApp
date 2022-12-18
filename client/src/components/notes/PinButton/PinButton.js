import IconButton from "@components/common/IconButton";
import React from "react";
import styles from "./PinButton.module.scss";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const PinButton = ({ isVisible, note, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <div className={`${styles.container} ${isVisible && styles.visible}`}>
      <IconButton
        onClick={handleClick}
        size={34}
        icon={note.pinned ? faSolidBookmark : faBookmark}
        iconSize="lg"
      ></IconButton>
    </div>
  );
};

PinButton.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  note: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PinButton;
