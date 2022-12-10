import React, { useState } from "react";
import PropTypes from "prop-types";
import useHover from "@hooks/useHover";
import IconButton from "@components/common/IconButton/IconButton";
import {
  faTag,
  faPen,
  faTrash,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./TagEditItem.module.scss";

const TagEditItem = ({ tag }) => {
  const [inputValue, setInputValue] = useState(tag);
  const [isFocused, setIsFocused] = useState(false);
  const [hoverRef, isHovered] = useHover();

  const deleteButtonIcon = isHovered || isFocused ? faTrash : faTag;
  const editButtonIcon = isFocused ? faCheck : faPen;

  const handleChange = (e) => {
    setInputValue(e.currentTarget.value);
  };

  const handleDelete = () => {};

  const handleEdit = () => {};

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <li key={tag} ref={hoverRef} className={styles.container}>
      <div className={styles.buttonInputGroup}>
        <div>
          <IconButton
            icon={deleteButtonIcon}
            onClick={handleDelete}
            size={28}
            variant="grey"
          />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <IconButton
        icon={editButtonIcon}
        onClick={handleEdit}
        size={28}
        variant="grey"
      />
    </li>
  );
};

TagEditItem.propTypes = {
  tag: PropTypes.string,
};

export default TagEditItem;
