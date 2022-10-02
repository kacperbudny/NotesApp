const mongoose = require("mongoose");
const config = require("../config/token.config");
const jwt = require("jsonwebtoken");

const userTokenSchema = new mongoose.Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: config.jwtRefreshExpiration,
  },
});

userTokenSchema.statics.createToken = async function (user) {
  try {
    let expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    const accessToken = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: config.jwtExpiration,
      }
    );

    const refreshToken = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: config.jwtRefreshExpiration,
      }
    );

    const userToken = await this.findOne({ userId: user._id });

    if (userToken) await userToken.remove();

    await new this({ userId: user._id, token: refreshToken }).save();

    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};

userTokenSchema.statics.verifyRefreshToken = async function (refreshToken) {
  const privateKey = process.env.REFRESH_SECRET_KEY;

  try {
    const userToken = await this.findOne({ token: refreshToken });

    if (!userToken) {
      throw new Error("Invalid refresh token");
    }

    const tokenDetails = await jwt.verify(refreshToken, privateKey);

    if (!tokenDetails) {
      throw new Error("Invalid refresh token");
    }

    return Promise.resolve({
      tokenDetails,
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = mongoose.model("UserToken", userTokenSchema);
