/**
 * Auth service.
 */

const User = require('../persistance/user');
const Utils = require('./utils');

async function createUser(user) {
  const foundUser = await User.getUserByEmail(user.email);

  if (foundUser) {
    throw new Error('User already exists.');
  }

  const encodedPassword = Utils.encodePassword(user.password);
  return User.addUser(user.email, encodedPassword);
}

module.exports = {
  createUser,
};
