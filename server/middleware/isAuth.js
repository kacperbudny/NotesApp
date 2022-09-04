const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      const error = new Error("No access token provided.");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodedToken) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }

    req.userId = decodedToken.userId;
  } catch (err) {
    err.statusCode = 500;

    if (err instanceof jwt.TokenExpiredError) {
      err.status = 401;
      err.message = "Access Token was expired.";
    }

    next(err);
  }
  next();
};
