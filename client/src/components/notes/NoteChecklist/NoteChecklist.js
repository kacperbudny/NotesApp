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

  return (
    <div>
      <ul className={styles.list}>
        {uncheckedItems.map((item) => (
          <li key={item.id} className={styles.listItem}>
            <Checkbox
              name={item.id}
              isChecked={item.isChecked}
              onCheck={() => onCheck(item)}
              onUncheck={() => onUncheck(item)}
            />
            <span>{item.content}</span>
          </li>
        ))}
      </ul>
      <hr className={styles.line} />
      <ul className={styles.list}>
        {checkedItems.map((item) => (
          <li key={item.id} className={styles.listItem}>
            <Checkbox
              name={item.id}
              isChecked={item.isChecked}
              onCheck={() => onCheck(item)}
              onUncheck={() => onUncheck(item)}
            />
            <span>{item.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

NoteChecklist.propTypes = {
  checklistItems: PropTypes.arrayOf(PropTypes.object),
  onCheckboxClick: PropTypes.func.isRequired,
};

export default NoteChecklist;
