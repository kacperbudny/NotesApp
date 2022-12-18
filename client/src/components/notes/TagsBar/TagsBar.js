import React from "react";
import styles from "./TagsBar.module.scss";
import PropTypes from "prop-types";
import TagsBadge from "@components/notes/TagsBadge";

const TagsBar = ({ tags, onRemoveTag, onBadgeClick }) => {
  if (!tags?.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      {tags.map((tag) => (
        <TagsBadge
          tag={tag}
          key={tag}
          onRemoveTag={onRemoveTag}
          onBadgeClick={onBadgeClick}
        />
      ))}
    </div>
  );
};

TagsBar.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  onRemoveTag: PropTypes.func.isRequired,
  onBadgeClick: PropTypes.func,
};

export default TagsBar;
