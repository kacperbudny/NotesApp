import React from "react";
import styles from "./TaggingBoxTagItem.module.scss";
import PropTypes from "prop-types";
import Checkbox from "@components/common/Checkbox";

const TaggingBoxTagItem = ({ tag, onAddTag, onRemoveTag, noteTags }) => {
  const isCheckboxChecked = noteTags.includes(tag);

  const handleCheckboxCheck = () => {
    onAddTag(tag);
  };

  const handleCheckboxUncheck = () => {
    onRemoveTag(tag);
  };

  return (
    <li className={styles.tag}>
      <label className={styles.tagLabel}>
        <Checkbox
          name={tag}
          isChecked={isCheckboxChecked}
          onCheck={handleCheckboxCheck}
          onUncheck={handleCheckboxUncheck}
        />
        <span className={styles.tagText}>{tag}</span>
      </label>
    </li>
  );
};

TaggingBoxTagItem.propTypes = {
  noteTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  tag: PropTypes.string.isRequired,
  onAddTag: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired,
};

export default TaggingBoxTagItem;
