const getDefaultNotes = (userId) => {
  return [
    {
      type: "TEXT",
      name: "My first note",
      content: "This is my very first note!",
      displayOrder: 1,
      color: "white",
      user: userId,
      archived: false,
      pinned: false,
    },
    {
      type: "TEXT",
      name: "Another note",
      content:
        "Hey, look, I've just made another one. And I'm going to make it somewhat long to see what happens.",
      displayOrder: 2,
      color: "white",
      user: userId,
      archived: false,
      pinned: false,
    },
    {
      type: "TEXT",
      name: "Shopping list",
      content: "Milk, bread, smiley faces",
      displayOrder: 3,
      color: "white",
      user: userId,
      archived: false,
      pinned: false,
    },
    {
      type: "TEXT",
      name: "Colorful boy",
      content: "Look mom, I'm green!",
      displayOrder: 4,
      color: "#CCFF99",
      user: userId,
      archived: false,
      pinned: false,
    },
  ];
};

module.exports = getDefaultNotes;
