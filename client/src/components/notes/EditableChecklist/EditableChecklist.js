import Checkbox from "@components/common/Checkbox";
import React from "react";
import styles from "./EditableChecklist.module.scss";
import PropTypes from "prop-types";

const EditableChecklist = ({
  checklistItems,
  onChecklistItemUpdate,
  onAddChecklistItem,
}) => {
  const handleNewItem = (e) => {};

  const uncheckedItems = checklistItems.filter((item) => !item.isChecked);
  const checkedItems = checklistItems.filter((item) => item.isChecked);

  return (
    <div className={styles.container}>
      <Checklist items={uncheckedItems} onUpdate={onChecklistItemUpdate} />
      <input onKeyDown={handleNewItem} />
      {checkedItems.length > 0 && uncheckedItems.length > 0 ? (
        <hr className={styles.line} />
      ) : null}
      <Checklist
        items={checkedItems}
        onUpdate={onChecklistItemUpdate}
        variant={"checked"}
      />
    </div>
  );
};

EditableChecklist.propTypes = {
  checklistItems: PropTypes.arrayOf(PropTypes.object),
  onChecklistItemUpdate: PropTypes.func.isRequired,
  onAddChecklistItem: PropTypes.func.isRequired,
};

export default EditableChecklist;

const Checklist = ({ items, onUpdate, variant = "unchecked" }) => {
  const handleCheck = (item) => {
    onUpdate({ ...item, isChecked: true });
  };

  const handleUncheck = (item) => {
    onUpdate({ ...item, isChecked: false });
  };

  const handleChange = (item, newValue) => {
    onUpdate({ ...item, content: newValue });
  };

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className={styles.listItem}>
          <Checkbox
            name={item.id}
            isChecked={item.isChecked}
            onCheck={() => handleCheck(item)}
            onUncheck={() => handleUncheck(item)}
          />
          <input
            className={`${styles.input} ${
              variant === "checked" ? styles.crossed : ""
            }`}
            value={item.content}
            onChange={(e) => handleChange(item, e.currentTarget.value)}
          />
        </li>
      ))}
    </ul>
  );
};

Checklist.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onUpdate: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["unchecked", "checked"]),
};
