const express = require("express");
const authController = require("../controllers/auth");
const { body } = require("express-validator");
const User = require("../models/user");
const ROUTES = require("../utils/constants/routes");

const router = express.Router();

router.post(
  ROUTES.register,
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
router.post(ROUTES.login, authController.postLogin);
router.delete(ROUTES.logout, authController.logout);
router.post(ROUTES.refreshToken, authController.postRefreshToken);

module.exports = router;
