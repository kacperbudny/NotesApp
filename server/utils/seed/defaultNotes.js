const crypto = require("crypto");

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
      content: "Hey, look, I've just made another one.",
      displayOrder: 2,
      color: "white",
      user: userId,
      archived: false,
      pinned: false,
    },
    {
      type: "CHECKLIST",
      name: "Shopping list",
      checklistItems: [
        { isChecked: false, content: "Milk", id: crypto.randomUUID() },
        { isChecked: false, content: "Bread", id: crypto.randomUUID() },
        { isChecked: false, content: "Smiley faces", id: crypto.randomUUID() },
      ],
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
      tags: ["New tag"],
    },
    {
      type: "TEXT",
      name: "Ah, the classic",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh turpis, dictum bibendum est venenatis, feugiat venenatis ante. Nam pretium tempus ipsum, vitae varius turpis blandit ut. Fusce tincidunt bibendum vestibulum. Etiam eu elementum justo. Nulla eu finibus enim. Suspendisse sit amet elit imperdiet turpis tincidunt fermentum. Donec non leo ac dui eleifend placerat eget sed tellus. Pellentesque non finibus lacus. Maecenas nec tellus enim. Sed ornare ultricies eros et malesuada. Nullam et iaculis massa, eget vulputate dui. Pellentesque aliquam magna ligula, ac laoreet ex cursus id. Etiam ac est nec erat sodales dapibus eu eu nisi.",
      displayOrder: 5,
      color: "#99CCFF",
      user: userId,
      archived: false,
      pinned: true,
    },
  ];
};

module.exports = getDefaultNotes;
