/**
 * Encrypt util.
 */
const bcrypt = require('bcrypt');

/**
 * Encrypts a password.
 *
 * @param ogPassword - the user's original password.
 *
 * @returns encrypted password.
 */
function encodePassword(ogPassword) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(ogPassword, salt);
}

/**
 * Compares a password given its hash.
 *
 * @param ogPassword - The user's original password.
 * @param hash       - The encryption hash.
 *
 * @returns whether the passwords are equal or not.
 */
function comparePasswords(ogPassword, hash) {
  return bcrypt.compareSync(ogPassword, hash);
}

module.exports = {
  encodePassword,
  comparePasswords,
};
