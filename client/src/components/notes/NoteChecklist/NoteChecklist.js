import React from "react";
import styles from "./NoteChecklist.module.scss";
import PropTypes from "prop-types";
import Checkbox from "@components/common/Checkbox";

const NoteChecklist = ({ checklistItems, onCheckboxClick }) => {
  const onCheck = (item) => {
    onCheckboxClick({ ...item, isChecked: true });
  };

  const onUncheck = (item) => {
    onCheckboxClick({ ...item, isChecked: false });
  };

  const uncheckedItems = checklistItems.filter((item) => !item.isChecked);
  const checkedItems = checklistItems.filter((item) => item.isChecked);
  const checkedLength = 9 - uncheckedItems.length;

  return (
    <div>
      <Checklist
        items={uncheckedItems}
        onCheck={onCheck}
        onUncheck={onUncheck}
      />
      {checkedItems.length > 0 && uncheckedItems.length > 0 ? (
        <hr className={styles.line} />
      ) : null}
      <Checklist
        items={checkedItems}
        onCheck={onCheck}
        onUncheck={onUncheck}
        variant={"checked"}
        maxLength={checkedLength >= 0 ? checkedLength : 0}
      />
      {checklistItems.length > 9 ? <span>...</span> : null}
    </div>
  );
};

NoteChecklist.propTypes = {
  checklistItems: PropTypes.arrayOf(PropTypes.object),
  onCheckboxClick: PropTypes.func.isRequired,
};

export default NoteChecklist;

const Checklist = ({
  items,
  onCheck,
  onUncheck,
  variant = "unchecked",
  maxLength = 9,
}) => {
  return (
    <ul className={styles.list}>
      {items.slice(0, maxLength).map((item) => (
        <li key={item._id} className={styles.listItem}>
          <div>
            <Checkbox
              name={item._id}
              isChecked={item.isChecked}
              onCheck={() => onCheck(item)}
              onUncheck={() => onUncheck(item)}
            />
          </div>
          <span
            className={`${styles.content} ${
              variant === "checked" ? styles.crossed : ""
            }`}
          >
            {item.content}
          </span>
        </li>
      ))}
    </ul>
  );
};

Checklist.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onCheck: PropTypes.func.isRequired,
  onUncheck: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["unchecked", "checked"]),
  maxLength: PropTypes.number,
};
