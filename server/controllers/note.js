const Note = require("../models/note");

exports.getAllNotes = async (req, res) => {
  try {
    const allNotes = await Note.find();

    if (!allNotes.length) {
      return res.status(404).json({
        message: "No notes found",
      });
    }

    return res.json(allNotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error(err);
  }
};

exports.postNote = async (req, res) => {
  const note = new Note({
    _id: req.body._id,
    name: req.body.name,
    content: req.body.content,
    displayOrder: req.body.displayOrder,
    color: req.body.color,
  });
  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateNote = async (req, res) => {
  res.send("Update a note");
};

exports.deleteNote = async (req, res) => {
  res.send("Delete a note");
};
