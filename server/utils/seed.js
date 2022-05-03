const Note = require("../models/note");

async function seed() {
  const notesCount = await Note.findOne();
  if (!notesCount) {
    Note.insertMany(
      [
        {
          name: "My first note",
          content: "This is my very first note!",
          displayOrder: 1,
          color: "white",
        },
        {
          name: "Another note",
          content: "Hey, look, I've just made another one. And I'm going to make it somewhat long to see what happens.",
          displayOrder: 2,
          color: "white",
        },
        {
          name: "Shopping list",
          content: "Milk, bread, happiness",
          displayOrder: 3,
          color: "white",
        },
        {
          name: "Colorful boy",
          content: "Look mom, I'm green!",
          displayOrder: 4,
          color: "#CCFF99",
        },
      ],
      (err) => {
        if (err) return console.error(err);
        console.log("Seeded Notes successfully!");
      }
    );
  }
}

module.exports = seed;