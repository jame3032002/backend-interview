const jwt = require("jsonwebtoken");

const {
  UNAUTHORIZED_STATUS,
  FORBIDDEN_STATUS,
} = require("../config/statusMessage");
const { accessTokenSecretKey } = require("../config/index");

const authorizedToAccess = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(UNAUTHORIZED_STATUS)
      .json({ success: false, message: "Access token is required" });
  }

  const [_, accessToken] = token.split("Bearer ");
  jwt.verify(accessToken, accessTokenSecretKey, (err, user) => {
    if (err) {
      return res
        .status(FORBIDDEN_STATUS)
        .json({ success: false, message: "Invalid access token" });
    }

    req.context = {
      user,
    };

    next();
  });
};

module.exports = {
  authorizedToAccess,
};
