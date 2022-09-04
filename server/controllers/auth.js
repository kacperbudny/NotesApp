const User = require("../models/user");
const Note = require("../models/note");
const getDefaultNotes = require("../utils/seed/defaultNotes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.postRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { email, password } = req.body;

    if (!(email && password)) {
      const error = new Error("All input is required");
      error.statusCode = 400;
      throw error;
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const encryptedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const defaultNotes = getDefaultNotes(user._id);
    const insertedNotes = await Note.insertMany(defaultNotes);
    user.notes.push(...insertedNotes);
    await user.save();

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    res.status(201).json({ success: true, user, token });
  } catch (error) {
    next(error);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      const error = new Error("All input is required");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ email });

    const doPasswordMatch = await bcrypt.compare(password, user.password);

    if (!user || !doPasswordMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      throw error;
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    return res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
