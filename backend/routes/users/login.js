const {
  BAD_REQUEST_STATUS,
  UNAUTHORIZED_STATUS,
  INTERNAL_SERVER_ERROR,
} = require("../../config/statusMessage");
const { isValidEmail } = require("../../helpers");
const { generateAccessToken } = require("../../helpers/auth");
const { findUserByEmail } = require("../../services/user.service");

module.exports = async (req, res) => {
  try {
    const { email: rawEmail, password: rawPassword } = req.body;

    if (!rawEmail || !rawPassword) {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ success: false, message: "Invalid parameters" });
    }

    const email = rawEmail.toLowerCase().trim();
    const password = rawPassword.trim();
    const isEmailValid = isValidEmail(email);

    if (!isEmailValid) {
      return res.status(BAD_REQUEST_STATUS).json({
        error: true,
        message: "Invalid email format",
      });
    }

    const user = await findUserByEmail({ email });

    if (!user) {
      return res.status(UNAUTHORIZED_STATUS).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const u = await user.comparePassword(password);
    if (!u) {
      return res.status(UNAUTHORIZED_STATUS).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const accessToken = generateAccessToken(user);

    delete user._doc.password;

    return res.json({
      success: true,
      user,
      accessToken,
    });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: true, message: "Internal server error" });
  }
};
