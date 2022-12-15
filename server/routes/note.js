const express = require("express");
const noteController = require("../controllers/note");
const isAuth = require("../middleware/isAuth");
const { body } = require("express-validator");

const router = express.Router();

router.get("/notes", isAuth, noteController.getAllNotes);
router.post(
  "/notes",
  isAuth,
  [
    body("name").trim(),
    body("content").trim(),
    body("displayOrder").isNumeric(),
    body("tags.*")
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage("The tag is too long."),
  ],
  noteController.postNote
);
router.patch(
  "/notes/:id",
  isAuth,
  [
    body("name").trim(),
    body("content").trim(),
    body("displayOrder").isNumeric(),
    body("tags.*")
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage("The tag is too long."),
  ],
  noteController.updateNote
);
router.delete("/notes/:id", isAuth, noteController.deleteNote);

module.exports = router;
