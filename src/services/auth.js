/**
 * Auth service.
 */

const User = require('../persistance/user');
const Utils = require('./utils');

/**
 * Creates a new user in the system.
 *
 * @param {User} user - The user to be registered.
 *
 * @returns {Promise<number>} Returns the ID of the newly created user.
 */
async function createUser(user) {
  const foundUser = await User.getUserByEmail(user.email);

  if (foundUser) {
    throw new Error('User already exists.');
  }

  const encodedPassword = Utils.encodePassword(user.password);
  return User.addUser(user.email, encodedPassword);
}

/**
 * Finds user in the system.
 *
 * @param {User} user - The user to find in the system.
 *
 * @returns {Promise<...>} ...
 */
async function findUser(user) {
  const foundUser = await User.getUserByEmail(user.email);

  if (foundUser && Utils.comparePasswords(user.password, foundUser.password)) {
    return foundUser.id;
  }
  throw new Error('Invalid e-mail or password.');
}

async function validateJWT(decoded) {
  const user = await User.getUserById(decoded);
  if (user) {
    return { isValid: true, credentials: { userId: user.id } };
  }
  return { isValid: false };
}

module.exports = {
  createUser,
  findUser,
  validateJWT,
};
