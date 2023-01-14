const express = require("express");
const noteController = require("../controllers/note");
const isAuth = require("../middleware/isAuth");
const { body } = require("express-validator");
const ROUTES = require("../utils/constants/routes");

const router = express.Router();

router.get(ROUTES.notes, isAuth, noteController.getAllNotes);
router.post(
  ROUTES.notes,
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
  `${ROUTES.notes}/:id`,
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
router.delete(`${ROUTES.notes}/:id`, isAuth, noteController.deleteNote);

module.exports = router;
