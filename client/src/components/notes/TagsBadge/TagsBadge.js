import useHover from "@hooks/useHover";
import React from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styles from "./TagsBadge.module.scss";
import { useNavigate } from "react-router-dom";
import FRONTEND_ROUTES from "@utils/constants/frontendRoutes";

const TagsBadge = ({ tag, onRemoveTag, onBadgeClick }) => {
  const [hoverRef, isHovered] = useHover();
  const navigate = useNavigate();

  const handleBadgeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBadgeClick) {
      onBadgeClick(tag);
    }
    navigate(`${FRONTEND_ROUTES.tag}/${encodeURIComponent(tag)}`);
  };

  const handleRemoveButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemoveTag(tag);
  };

  return (
    <div className={styles.badge} ref={hoverRef}>
      <span
        className={`${styles.tagName} ${isHovered && styles.tagNameShortened}`}
        onClick={handleBadgeClick}
      >
        {tag}
      </span>
      <button
        className={`${styles.closeButton} ${isHovered && styles.visible}`}
        onClick={handleRemoveButtonClick}
        type="button"
      >
        <FontAwesomeIcon icon={faXmark} size="xs" />
      </button>
    </div>
  );
};

TagsBadge.propTypes = {
  tag: PropTypes.string,
  onRemoveTag: PropTypes.func.isRequired,
  onBadgeClick: PropTypes.func,
};

export default TagsBadge;
