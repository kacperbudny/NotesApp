const Note = require("../models/note");
const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.getAllNotes = async (req, res, next) => {
  try {
    const allNotes = await Note.find({ user: req.userId });
    const allTags = Array.from(
      new Set(allNotes.map((note) => note.tags).flat())
    );

    return res.json({ notes: allNotes, tags: allTags });
  } catch (err) {
    next(err);
  }
};

exports.postNote = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }

    const note = new Note({
      _id: req.body._id,
      name: req.body.name,
      content: req.body.content,
      displayOrder: req.body.displayOrder,
      color: req.body.color,
      archived: req.body.archived,
      pinned: req.body.pinned,
      tags: req.body.tags,
      user: req.userId,
    });

    const newNote = await note.save();
    const user = await User.findById(req.userId);
    user.notes.push(newNote);
    await user.save();

    res.status(201).json({
      message: "Note saved successfully",
      note: newNote,
      user: { _id: user._id, email: user.email, notes: user.notes },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }

    const id = req.params.id;
    const note = await Note.findById(id);

    if (note.user.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }

    const updatedNote = req.body;
    const result = await Note.findByIdAndUpdate(id, updatedNote, { new: true });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);

    if (!note) {
      const error = new Error("Could not find note.");
      error.statusCode = 404;
      throw error;
    }

    if (note.user.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }

    await Note.findByIdAndRemove(id);

    const user = await User.findById(req.userId);
    user.notes.pull(id);
    await user.save();

    res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    next(error);
  }
};
