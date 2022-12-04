import React from "react";
import styles from "./TagsBar.module.scss";
import PropTypes from "prop-types";
import TagsBadge from "../TagsBadge/TagsBadge";

const TagsBar = ({ tags, onRemoveTag }) => {
  if (!tags?.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      {tags.map((tag) => (
        <TagsBadge tag={tag} key={tag} onRemoveTag={onRemoveTag} />
      ))}
    </div>
  );
};

TagsBar.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  onRemoveTag: PropTypes.func.isRequired,
};

export default TagsBar;
