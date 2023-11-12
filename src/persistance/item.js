/**
 * Item persistance.
 */
const Knex = require('../knex');

/**
 * Inserts a new item to database, throws an error if the insert fails.
*
* @param {string} description - the description of the item to create.
*
* @returns the created item. //TODO: add item typedef
*/
function add(description) {
  try {
    return Knex('items')
      .insert({ description })
      .returning([
        'id',
        'state',
        'description',
        'createdAt',
        'completedAt',
      ]);
  } catch (error) {
    throw new Error('Error inserting item into DB.');
  }
}

module.exports = {
  add,
};
