import React from "react";
import styles from "./NoteChecklist.module.scss";
import PropTypes from "prop-types";
import Checkbox from "@components/common/Checkbox";

const NoteChecklist = ({ checklistItems }) => {
  const onCheck = () => {};

  const onUncheck = () => {};

  return (
    <ul>
      {checklistItems.map((item) => (
        <li key={item.id}>
          <Checkbox
            name={item.id}
            checked={item.isChecked}
            onCheck={onCheck}
            onUncheck={onUncheck}
          />
          <p>{item.content}</p>
        </li>
      ))}
    </ul>
  );
};

NoteChecklist.propTypes = {
  checklistItems: PropTypes.arrayOf(PropTypes.object),
};

export default NoteChecklist;
