import Checkbox from "@components/common/Checkbox";
import React from "react";
import styles from "./EditableChecklist.module.scss";
import PropTypes from "prop-types";

const EditableChecklist = ({ checklistItems }) => {
  const onCheck = () => {};

  const onUncheck = () => {};

  const variant = "";

  return (
    <div>
      <ul className={styles.list}>
        {checklistItems.map((item) => (
          <li key={item.id} className={styles.listItem}>
            <Checkbox
              name={item.id}
              isChecked={item.isChecked}
              onCheck={() => onCheck(item)}
              onUncheck={() => onUncheck(item)}
            />
            <span className={variant === "checked" ? styles.crossed : ""}>
              {item.content}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

EditableChecklist.propTypes = {
  checklistItems: PropTypes.arrayOf(PropTypes.object),
  onCheckboxClick: PropTypes.func.isRequired,
};

export default EditableChecklist;
