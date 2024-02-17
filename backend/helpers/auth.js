const jwt = require("jsonwebtoken");

const { accessTokenSecretKey } = require("../config");

function generateAccessToken(user) {
  return jwt.sign(
    { userId: user._id, email: user.email, name: user.name, role: "user" },
    accessTokenSecretKey,
    {
      expiresIn: "365d",
    }
  );
}

module.exports = {
  generateAccessToken,
};
