const jwt = require("jsonwebtoken");

const { accessTokenSecretKey, refreshTokenSecretKey } = require("../config");

function generateAccessToken(user) {
  console.log(accessTokenSecretKey, refreshTokenSecretKey);
  return jwt.sign(
    { userId: user._id, email: user.email, name: user.name, role: "user" },
    accessTokenSecretKey,
    {
      expiresIn: "15m",
    }
  );
}

function generateRefreshToken(user) {
  return jwt.sign({ userId: user._id }, refreshTokenSecretKey);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
