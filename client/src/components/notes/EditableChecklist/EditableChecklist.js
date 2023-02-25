import Checkbox from "@components/common/Checkbox";
import React, { forwardRef, useEffect, useRef } from "react";
import styles from "./EditableChecklist.module.scss";
import PropTypes from "prop-types";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@components/common/IconButton/IconButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useHover from "@hooks/useHover";

const EditableChecklist = ({
  checklistItems,
  onChecklistItemUpdate,
  onAddChecklistItem,
  onRemoveChecklistItem,
}) => {
  const inputElements = useRef({});
  const itemIdToFocus = useRef(null);

  useEffect(() => {
    if (itemIdToFocus.current) {
      const element = inputElements.current[itemIdToFocus.current];
      element.focus();
      itemIdToFocus.current = null;
    }
  }, [checklistItems]);

  const handleNewItem = (e) => {
    e.preventDefault();

    let newItemId;

    if (itemIdToFocus.current) {
      return;
    }

    if (
      e.key.length === 1 ||
      (e.key.length > 1 && /[^a-zA-Z0-9]/.test(e.key))
    ) {
      newItemId = onAddChecklistItem(e.key);
    } else if (e.key === "Spacebar") {
      newItemId = onAddChecklistItem(" ");
    } else {
      return;
    }

    itemIdToFocus.current = newItemId;
  };

  const uncheckedItems = checklistItems.filter((item) => !item.isChecked);
  const checkedItems = checklistItems.filter((item) => item.isChecked);

  return (
    <div className={styles.container}>
      <Checklist
        items={uncheckedItems}
        onUpdate={onChecklistItemUpdate}
        onRemove={onRemoveChecklistItem}
        ref={inputElements}
      />
      <div className={styles.listItem}>
        <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
        <input
          onKeyDown={handleNewItem}
          className={styles.newItemInput}
          placeholder="List element"
        />
      </div>
      {checkedItems.length > 0 && uncheckedItems.length > 0 ? (
        <hr className={styles.line} />
      ) : null}
      <Checklist
        items={checkedItems}
        onUpdate={onChecklistItemUpdate}
        onRemove={onRemoveChecklistItem}
        variant={"checked"}
      />
    </div>
  );
};

EditableChecklist.propTypes = {
  checklistItems: PropTypes.arrayOf(PropTypes.object),
  onChecklistItemUpdate: PropTypes.func.isRequired,
  onAddChecklistItem: PropTypes.func.isRequired,
  onRemoveChecklistItem: PropTypes.func.isRequired,
};

export default EditableChecklist;

const Checklist = forwardRef(
  ({ items, onUpdate, variant = "unchecked", onRemove }, ref) => {
    return (
      <ul className={styles.list}>
        {items.map((item) => (
          <ChecklistItem
            key={item.id}
            item={item}
            onUpdate={onUpdate}
            variant={variant}
            ref={ref}
            onRemove={onRemove}
          />
        ))}
      </ul>
    );
  }
);

Checklist.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["unchecked", "checked"]),
};

const ChecklistItem = forwardRef(
  ({ item, onUpdate, onRemove, variant = "unchecked" }, ref) => {
    const [hoverRef, isHovered] = useHover();

    const handleCheck = () => {
      onUpdate({ ...item, isChecked: true });
    };

    const handleUncheck = () => {
      onUpdate({ ...item, isChecked: false });
    };

    const handleChange = (e) => {
      onUpdate({ ...item, content: e.currentTarget.value });
    };

    const handleRemove = () => {
      onRemove(item.id);
    };

    return (
      <li className={styles.listItem} ref={hoverRef}>
        <Checkbox
          name={item.id}
          isChecked={item.isChecked}
          onCheck={handleCheck}
          onUncheck={handleUncheck}
        />
        <input
          className={`${styles.input} ${
            variant === "checked" ? styles.crossed : ""
          }`}
          value={item.content}
          onChange={handleChange}
          ref={(element) => {
            if (ref) {
              ref.current[item.id] = element;
            }
          }}
        />
        <div className={`${!isHovered && styles.hidden}`}>
          <IconButton
            icon={faXmark}
            onClick={handleRemove}
            size={19}
            variant="grey"
          />
        </div>
      </li>
    );
  }
);

ChecklistItem.propTypes = {
  items: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["unchecked", "checked"]),
};
