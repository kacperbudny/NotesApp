import IconButton from "@components/common/IconButton/IconButton";
import React from "react";
import styles from "./PinButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const PinButton = ({ isHovered = true, isAdding = false, note, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      style={{
        opacity: `${isAdding || isHovered ? "80%" : "0"}`,
      }}
      className={styles.container}
    >
      <IconButton onClick={handleClick} size={34}>
        <FontAwesomeIcon
          icon={note.pinned ? faSolidBookmark : faBookmark}
          size="lg"
        />
      </IconButton>
    </div>
  );
};

PinButton.propTypes = {
  isHovered: PropTypes.bool,
  isAdding: PropTypes.bool,
  note: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PinButton;
