import React from "react";
import styles from "./TagsBar.module.scss";
import PropTypes from "prop-types";

const TagsBar = ({ tags }) => {
  if (!tags?.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      {tags.map((tag) => (
        <span className={styles.badge} key={tag}>
          {tag}
        </span>
      ))}
    </div>
  );
};

TagsBar.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default TagsBar;
