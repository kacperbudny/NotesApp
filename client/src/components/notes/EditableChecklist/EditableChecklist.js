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
      <Checklist
        items={uncheckedItems}
        onUpdate={onChecklistItemUpdate}
        onRemove={onRemoveChecklistItem}
        onReorder={onReorderChecklistItems}
        ref={inputElements}
      />
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
      <Checklist
        items={checkedItems}
        onUpdate={onChecklistItemUpdate}
        onRemove={onRemoveChecklistItem}
        onReorder={onReorderChecklistItems}
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
  onReorderChecklistItems: PropTypes.func.isRequired,
  shouldFocusOnRender: PropTypes.bool,
};

export default EditableChecklist;

const Checklist = forwardRef(
  ({ items, onUpdate, variant = "unchecked", onRemove, onReorder }, ref) => {
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
            onReorder={onReorder}
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
  onReorder: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["unchecked", "checked"]),
};

const ChecklistItem = forwardRef(
  ({ item, onUpdate, onRemove, onReorder, variant = "unchecked" }, ref) => {
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

    const [{ handlerId }, drop] = useDrop({
      accept: DRAG_TYPES.checklist,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(dragItem, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = dragItem.id;
        const hoverIndex = item.id;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }
        // // Determine rectangle on screen
        // const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // // Get vertical middle
        // const hoverMiddleY =
        //   (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // // Determine mouse position
        // const clientOffset = monitor.getClientOffset();
        // // Get pixels to the top
        // const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // // Only perform the move when the mouse has crossed half of the items height
        // // When dragging downwards, only move when the cursor is below 50%
        // // When dragging upwards, only move when the cursor is above 50%
        // // Dragging downwards
        // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        //   return;
        // }
        // // Dragging upwards
        // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        //   return;
        // }
        // Time to actually perform the action
        onReorder(dragIndex, hoverIndex);
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        dragItem.index = hoverIndex;
      },
    });

    const [{ isDragging }, drag, preview] = useDrag(() => ({
      type: DRAG_TYPES.checklist,
      item: () => {
        return item;
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <li className={styles.listItem} ref={preview(drop(hoverRef))}>
        <div
          ref={drag}
          className={`${styles.dragGrip} ${!isHovered && styles.hidden}`}
        >
          <FontAwesomeIcon icon={faGripVertical} />
        </div>
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
  onReorder: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["unchecked", "checked"]),
};
