const UserModel = require("../models/user");

async function findUserByEmail({ email }) {
  const user = await UserModel.findOne({ email });

  return user;
}

async function createUser({ email, name, password }) {
  const user = await UserModel.create({ email, name, password });

  return user;
}

module.exports = {
  findUserByEmail,
  createUser,
};
