const express = require("express");
const authController = require("../controllers/auth");
const { body } = require("express-validator/check");
const User = require("../models/user");

const router = express.Router();

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.postRegister
);
router.post("/login", authController.postLogin);
router.get("/me", authController.getMe);

module.exports = router;
