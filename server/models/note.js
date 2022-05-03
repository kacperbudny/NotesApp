const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  name: String,
  content: String,
  displayOrder: { type: Number, required: true },
  color: { type: String, default: "white" },
});

module.exports = mongoose.model("Note", noteSchema);
