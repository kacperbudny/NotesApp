const express = require("express");
const noteController = require("../controllers/note");

const router = express.Router();

router.get("/notes", noteController.getAllNotes);
router.post("/notes", noteController.postNote);
router.patch("/notes/:id", noteController.updateNote);

module.exports = router;
