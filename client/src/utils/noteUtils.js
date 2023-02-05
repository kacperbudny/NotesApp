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
  const checklistItems = note.content.split(/\r?\n/).map((line) => ({
    isChecked: false,
    content: line,
    id: crypto.randomUUID(),
  }));

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
