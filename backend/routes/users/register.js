const {
  CREATE_STATUS,
  BAD_REQUEST_STATUS,
  INTERNAL_SERVER_ERROR,
} = require("../../config/statusMessage");
const { isValidEmail, isValidPassword } = require("../../helpers");
const { findUserByEmail, createUser } = require("../../services/user.service");

module.exports = async (req, res) => {
  try {
    const { email: rawEmail, name, password: rawPassword } = req.body;
    const email = rawEmail.toLowerCase().trim();
    const password = rawPassword.trim();

    if (!email || !name || !password) {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: true, message: "Invalid parameters" });
    }

    const isEmailValid = isValidEmail(email);
    const isPasswordValid = isValidPassword(password);

    if (!isEmailValid) {
      return res.status(BAD_REQUEST_STATUS).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (!isPasswordValid) {
      return res.status(BAD_REQUEST_STATUS).json({
        success: false,
        message:
          "Password must contain uppercase, lowercase, integer, special character and more than 8 characters",
      });
    }

    const isEmailExists = await findUserByEmail({ email });
    if (isEmailExists) {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: true, message: "This email has already exists" });
    }

    const user = await createUser({
      email,
      name,
      password,
    });

    delete user._doc.password;

    return res.status(CREATE_STATUS).json({ success: true, user });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: true, message: "Internal server error" });
  }
};
