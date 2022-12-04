import useHover from "@hooks/useHover";
import React from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styles from "./TagsBadge.module.scss";

const TagsBadge = ({ tag, onRemoveTag }) => {
  const [hoverRef, isHovered] = useHover();

  const handleRemoveButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemoveTag(tag);
  };

  return (
    <div className={styles.badge} ref={hoverRef}>
      <span
        className={`${styles.tagName} ${isHovered && styles.tagNameShortened}`}
      >
        {tag}
      </span>
      <button
        className={`${styles.closeButton} ${isHovered && styles.visible}`}
        onClick={handleRemoveButtonClick}
      >
        <FontAwesomeIcon icon={faXmark} size="xs" />
      </button>
    </div>
  );
};

TagsBadge.propTypes = {
  tag: PropTypes.string,
  onRemoveTag: PropTypes.func.isRequired,
};

export default TagsBadge;
