import { DragPreviewChecklistItem } from "@components/notes/EditableChecklist/EditableChecklist";
import { DragPreviewNote } from "@components/notes/Note/Note";
import DRAG_TYPES from "@utils/constants/dragTypes";
import { useDragLayer } from "react-dnd";
import styles from "./CustomDragLayer.module.scss";

function getItemStyles(currentOffset) {
  if (!currentOffset) {
    return {
      display: "none",
    };
  }
  let { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

const CustomDragLayer = () => {
  const { itemType, isDragging, item, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      isDragging: monitor.isDragging(),
      currentOffset: monitor.getSourceClientOffset(),
    })
  );

  function renderItem() {
    switch (itemType) {
      case DRAG_TYPES.checklist:
        return <DragPreviewChecklistItem item={item} />;
      case DRAG_TYPES.note:
        return <DragPreviewNote note={item} />;
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  }

  return (
    <div className={styles.layer}>
      <div style={getItemStyles(currentOffset)}>{renderItem()}</div>
    </div>
  );
};

export default CustomDragLayer;
