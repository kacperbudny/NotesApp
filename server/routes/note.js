const express = require("express");
const noteController = require("../controllers/note");

const router = express.Router();

router.get("/notes", noteController.getAllNotes);
router.post("/notes", noteController.postNote);

module.exports = router;
