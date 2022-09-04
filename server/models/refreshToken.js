const mongoose = require("mongoose");
const config = require("../config/token.config");
const { v4: uuidv4 } = require("uuid");

const refreshTokenSchema = new mongoose.Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expiryDate: Date,
});

refreshTokenSchema.statics.createToken = async function (user) {
  let expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);
  let _token = uuidv4();
  let _object = new this({
    token: _token,
    user: user._id,
    expiryDate: expiredAt.getTime(),
  });
  let refreshToken = await _object.save();
  return refreshToken.token;
};

refreshTokenSchema.statics.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
