const User = require("../models/user");
const Note = require("../models/note");
const RefreshToken = require("../models/refreshToken");
const getDefaultNotes = require("../utils/seed/defaultNotes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const config = require("../config/token.config");

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
      { userId: user._id.toString(), email },
      config.secret,
      {
        expiresIn: config.jwtExpiration,
      }
    );

    const refreshToken = await RefreshToken.createToken(user);

    res.status(201).json({ success: true, user, token, refreshToken });
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
      config.secret,
      {
        expiresIn: config.jwtExpiration,
      }
    );

    const refreshToken = await RefreshToken.createToken(user);

    return res.status(200).json({ user, token, refreshToken });
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

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    const refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      }).exec();

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    let newAccessToken = jwt.sign(
      { id: refreshToken.user._id },
      config.secret,
      {
        expiresIn: config.jwtExpiration,
      }
    );

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    next(err);
  }
};
