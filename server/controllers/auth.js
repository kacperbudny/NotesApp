const User = require("../models/user");
const Note = require("../models/note");
const UserToken = require("../models/userToken");
const getDefaultNotes = require("../utils/seed/defaultNotes");
const bcrypt = require("bcryptjs");
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

    const { accessToken, refreshToken } = await UserToken.createToken(user);

    res.status(201).json({ user, token: accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All input is required");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      throw error;
    }

    const doPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doPasswordMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      throw error;
    }

    const { accessToken, refreshToken } = await UserToken.createToken(user);

    return res.status(200).json({ user, token: accessToken, refreshToken });
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

exports.postRefreshToken = async (req, res, next) => {
  const { refreshToken: requestToken } = req.body;

  try {
    if (!requestToken) {
      const error = new Error("Refresh Token is required");
      error.statusCode = 403;
      throw error;
    }

    const { tokenDetails } = await UserToken.verifyRefreshToken(requestToken);

    const { accessToken } = await UserToken.createToken({
      _id: tokenDetails.userId,
      email: tokenDetails.email,
    });

    return res.status(200).json({
      accessToken: accessToken,
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  const { refreshToken: requestToken } = req.body;

  try {
    if (!requestToken) {
      const error = new Error("Refresh Token is required");
      error.statusCode = 403;
      throw error;
    }

    const userToken = await UserToken.findOne({ token: req.body.refreshToken });

    if (!userToken)
      return res
        .status(200)
        .json({ error: false, message: "Logged Out Sucessfully" });

    await userToken.remove();

    res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
  } catch (err) {
    next(err);
  }
};
