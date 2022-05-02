const Note = require("../models/note");

async function seed() {
  const notesCount = await Note.findOne();
  if (!notesCount) {
    Note.insertMany(
      [
        {
          id: 1,
          name: "My first note",
          text: "This is my very first note!",
          displayOrder: 1,
          color: "white",
        },
        {
          id: 2,
          name: "Another note",
          text: "Hey, look, I've just made another one. And I'm going to make it somewhat long to see what happens.",
          displayOrder: 2,
          color: "white",
        },
        {
          id: 3,
          name: "Shopping list",
          text: "Milk, bread, happiness",
          displayOrder: 3,
          color: "white",
        },
        {
          id: 4,
          name: "Colorful boy",
          text: "Look mom, I'm green!",
          displayOrder: 4,
          color: "green",
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