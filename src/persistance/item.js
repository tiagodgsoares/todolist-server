/**
 * Item persistance.
 */
const Knex = require('../knex');

/**
 * Inserts a new item to database, throws an error if the insert fails.
*
* @param {string} description - The description of the item to create.
*
* @returns {Item} The created item.
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

/**
 * Retrieves all items from the database and orders them by the specified criteria.
 *
 * @param {string} order - The order criteria.
 *
 * @returns {Item[]} An array of items ordered by the specified criteria.
 */
function getAllItemsOrderedBy(order) {
  try {
    return Knex('items')
      .select('*')
      .orderBy(order);
  } catch (error) {
    throw new Error('Error fetching items from DB.');
  }
}

/**
 * Retrieves items from the database filtered by state and orders them by the specified criteria.
 *
 * @param {string} filter - The filter criteria.
 * @param {string} order  - The order criteria.
 *
 * @returns {Item[]} An array of items filtered and ordered based on the criteria.
 */
function getItemsFilteredBy(filter, order) {
  try {
    return Knex('items')
      .select('*')
      .where('state', filter)
      .orderBy(order);
  } catch (error) {
    throw new Error('Error fetching items from DB.');
  }
}

module.exports = {
  add,
  getAllItemsOrderedBy,
  getItemsFilteredBy,
};
