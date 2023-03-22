import NOTE_TYPES from "@constants/noteTypes";

export const swapChecklistMode = (note) => {
  switch (note.type) {
    case NOTE_TYPES.text: {
      return convertToChecklist(note);
    }
    case NOTE_TYPES.checklist: {
      return convertToText(note);
    }
    default: {
      throw new Error("Unknown note type!");
    }
  }
};

const convertToChecklist = (note) => {
  const checklistItems = note.content.length
    ? note.content.split(/\r?\n/).map((line) => ({
        isChecked: false,
        content: line,
        id: crypto.randomUUID(),
      }))
    : [];

  const convertedNote = {
    ...note,
    content: null,
    checklistItems,
    type: NOTE_TYPES.checklist,
  };

  return convertedNote;
};

const convertToText = (note) => {
  const content = note.checklistItems.map((item) => item.content).join("\r\n");

  const convertedNote = {
    ...note,
    content,
    checklistItems: null,
    type: NOTE_TYPES.text,
  };

  return convertedNote;
};

export const updateChecklistItem = (note, updatedChecklistItem) => {
  const newChecklistItems = [...note.checklistItems];
  const itemToEditIndex = newChecklistItems.findIndex(
    (item) => item.id === updatedChecklistItem.id
  );
  newChecklistItems[itemToEditIndex] = updatedChecklistItem;

  return {
    ...note,
    checklistItems: newChecklistItems,
  };
};

export const addChecklistItem = (note, newChecklistItem) => {
  return {
    ...note,
    checklistItems: [
      ...note.checklistItems,
      {
        isChecked: false,
        ...newChecklistItem,
      },
    ],
  };
};

export const removeChecklistItem = (note, itemIdToRemove) => {
  return {
    ...note,
    checklistItems: note.checklistItems.filter(
      (item) => item.id !== itemIdToRemove
    ),
  };
};

export const reorderChecklistItems = (note, sourceItemId, targetItemId) => {
  const newChecklistItems = [...note.checklistItems];

  const sourceItemIndex = newChecklistItems.findIndex(
    (item) => item.id === sourceItemId
  );
  const targetItemIndex = newChecklistItems.findIndex(
    (item) => item.id === targetItemId
  );

  newChecklistItems.splice(
    targetItemIndex,
    0,
    newChecklistItems.splice(sourceItemIndex, 1)[0]
  );

  return {
    ...note,
    checklistItems: newChecklistItems,
  };
};

export const removeTag = (note, tag) => {
  return { ...note, tags: note.tags.filter((t) => t !== tag) };
};

export const addTag = (note, tag) => {
  return { ...note, tags: [...note.tags, tag] };
};
