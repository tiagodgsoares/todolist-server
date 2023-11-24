/// <reference path='../typedefs.js'/>
/**
 * User persistance.
 */
const Knex = require('../knex');

/**
 * Inserts a new user to database, throws an error if the insert fails.
*
* @param {string} email     - The e-mail of the user to create.
* @param {string} password  - The password of the user to create.
*
* @returns {Promise<User>} The created user.
*/
async function addUser(email, password) {
  try {
    const user = await Knex('users')
      .insert({ email, password })
      .returning('id');
    return user[0];
  } catch (error) {
    throw new Error('Error inserting user into DB.');
  }
}

/**
 * Retrieves an user from the database by its ID.
 *
 * @param {number} id - The unique identifier of the user.
 *
 * @returns {Promise<User | null>} The user with the specified ID, or null if not found.
 */
async function getUserById(id) {
  try {
    const user = await Knex('users')
      .select('*')
      .where('id', id)
      .first();
    return user;
  } catch (error) {
    throw new Error('Error fetching user from DB.');
  }
}

/**
 * Retrieves an user from the database by its e-mail.
 *
 * @param {string} email - The e-mail of the user.
 *
 * @returns {Promise<User | null>} The user with the specified ID, or null if not found.
 */
async function getUserByEmail(email) {
  try {
    const user = await Knex('users')
      .select('*')
      .where('email', email)
      .first();
    return user;
  } catch (error) {
    throw new Error('Error fetching user from DB.');
  }
}

/**
 * Updates the email of an user in the database.
 *
 * @param {User} user - The user to update.
 *
 * @returns {Promise<User>} The updated user.
 */
function updateUserEmail(user) {
  try {
    return Knex('users')
      .where('id', user.id)
      .update({
        email: user.email,
      });
  } catch (error) {
    throw new Error('Error updating user in DB.');
  }
}

/**
 * Updates the name of an user in the database.
 *
 * @param {User} user - The user to update.
 *
 * @returns {Promise<User>} The updated user.
 */
function updateUserName(user) {
  try {
    return Knex('users')
      .where('id', user.id)
      .update({
        name: user.name,
      });
  } catch (error) {
    throw new Error('Error updating user in DB.');
  }
}

/**
 * Updates the password of an user in the database.
 *
 * @param {User} user - The user to update.
 *
 * @returns {Promise<User>} The updated user.
 */
function updateUserPassword(user) {
  try {
    return Knex('users')
      .where('id', user.id)
      .update({
        password: user.password,
      });
  } catch (error) {
    throw new Error('Error updating user in DB.');
  }
}

module.exports = {
  addUser,
  getUserById,
  getUserByEmail,
  updateUserEmail,
  updateUserName,
  updateUserPassword,
};
