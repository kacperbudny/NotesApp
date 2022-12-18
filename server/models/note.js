const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    name: String,
    content: String,
    displayOrder: { type: Number, required: true },
    color: { type: String, default: "white" },
    archived: { type: Boolean, default: false },
    pinned: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
