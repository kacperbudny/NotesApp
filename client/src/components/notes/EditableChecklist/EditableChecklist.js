import Checkbox from "@components/common/Checkbox";
import React, { forwardRef, useEffect, useRef } from "react";
import styles from "./EditableChecklist.module.scss";
import PropTypes from "prop-types";
import { faPlus, faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@components/common/IconButton/IconButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useHover from "@hooks/useHover";
import { useDrag, useDrop } from "react-dnd";
import DRAG_TYPES from "@utils/constants/dragTypes";

const EditableChecklist = ({
  noteColor,
  checklistItems,
  onChecklistItemUpdate,
  onAddChecklistItem,
  onRemoveChecklistItem,
  onReorderChecklistItems,
  shouldFocusOnRender = false,
}) => {
  const inputElements = useRef({});
  const itemIdToFocus = useRef(null);
  const newItemInputRef = useRef(null);

  useEffect(() => {
    if (shouldFocusOnRender) {
      newItemInputRef.current.focus();
    }
  }, [shouldFocusOnRender]);

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
      <ul className={styles.list}>
        {uncheckedItems.map((item) => (
          <ChecklistItem
            key={item._id}
            noteColor={noteColor}
            item={item}
            onUpdate={onChecklistItemUpdate}
            ref={inputElements}
            onRemove={onRemoveChecklistItem}
            onReorder={onReorderChecklistItems}
          />
        ))}
      </ul>
      <div className={styles.listItem}>
        <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
        <input
          onKeyDown={handleNewItem}
          className={styles.newItemInput}
          placeholder="List element"
          ref={newItemInputRef}
        />
      </div>
      {checkedItems.length > 0 && uncheckedItems.length > 0 ? (
        <hr className={styles.line} />
      ) : null}
      <ul className={styles.list}>
        {checkedItems.map((item) => (
          <ChecklistItem
            key={item._id}
            noteColor={noteColor}
            item={item}
            onUpdate={onChecklistItemUpdate}
            ref={inputElements}
            onRemove={onRemoveChecklistItem}
            onReorder={onReorderChecklistItems}
          />
        ))}
      </ul>
    </div>
  );
};

EditableChecklist.propTypes = {
  noteColor: PropTypes.string,
  checklistItems: PropTypes.arrayOf(PropTypes.object),
  onChecklistItemUpdate: PropTypes.func.isRequired,
  onAddChecklistItem: PropTypes.func.isRequired,
  onRemoveChecklistItem: PropTypes.func.isRequired,
  onReorderChecklistItems: PropTypes.func.isRequired,
  shouldFocusOnRender: PropTypes.bool,
};

export default EditableChecklist;

const ChecklistItem = forwardRef(
  ({ noteColor, item, onUpdate, onRemove, onReorder }, ref) => {
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
      onRemove(item._id);
    };

    const [, drop] = useDrop({
      accept: DRAG_TYPES.checklist,
      hover(dragItem) {
        if (item.isChecked) {
          return;
        }

        if (!hoverRef.current) {
          return;
        }

        const dragIndex = dragItem._id;
        const hoverIndex = item._id;

        if (dragIndex === hoverIndex) {
          return;
        }

        onReorder(dragIndex, hoverIndex);
      },
      canDrop: () => {
        return !item.isChecked;
      },
    });

    const [{ isDragging }, drag, preview] = useDrag(() => ({
      type: DRAG_TYPES.checklist,
      item: () => {
        return { ...item, noteColor };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag: () => {
        return !item.isChecked;
      },
    }));

    return (
      <li
        className={`${isDragging && styles.draggedItem}`}
        ref={drop(preview(hoverRef))}
      >
        <div className={`${styles.listItem} ${isDragging && styles.hidden}`}>
          <div
            ref={drag}
            className={`${styles.dragGrip} ${
              (!isHovered || item.isChecked) && styles.hidden
            }`}
          >
            <FontAwesomeIcon icon={faGripVertical} />
          </div>
          <div>
            <Checkbox
              name={item._id}
              isChecked={item.isChecked}
              onCheck={handleCheck}
              onUncheck={handleUncheck}
            />
          </div>
          <input
            className={`${styles.input} ${
              item.isChecked ? styles.crossed : ""
            }`}
            value={item.content}
            onChange={handleChange}
            ref={(element) => {
              if (ref) {
                ref.current[item._id] = element;
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
        </div>
      </li>
    );
  }
);

ChecklistItem.propTypes = {
  noteColor: PropTypes.string,
  items: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onReorder: PropTypes.func.isRequired,
};

export const DragPreviewChecklistItem = ({ item }) => {
  return (
    <div
      className={`${styles.previewListItem}`}
      style={{ backgroundColor: item.noteColor }}
    >
      <div className={`${styles.dragGrip}`}>
        <FontAwesomeIcon icon={faGripVertical} />
      </div>
      <Checkbox
        name={item._id}
        isChecked={item.isChecked}
        onCheck={() => {}}
        onUncheck={() => {}}
      />
      <input
        className={`${styles.input}`}
        value={item.content}
        onChange={() => {}}
      />
      <IconButton icon={faXmark} size={19} variant="grey" onClick={() => {}} />
    </div>
  );
};
