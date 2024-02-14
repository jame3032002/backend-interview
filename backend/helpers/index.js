function isValidEmail(email) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isValid = regex.test(email);

  return isValid;
}

function isValidPassword(password) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const isValid = regex.test(password);

  return isValid;
}

module.exports = {
  isValidPassword,
  isValidEmail,
};
