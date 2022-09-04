module.exports = {
  secret: process.env.SECRET_KEY,
  jwtExpiration: "3h",
  jwtRefreshExpiration: "48h",
};
