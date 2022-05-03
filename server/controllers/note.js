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
