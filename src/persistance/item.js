/**
 * Item persistance.
 */
const Knex = require('../knex');

/**
 * Inserts a new item to database, throws an error if the insert fails.
*
* @param {string} description - The description of the item to create.
*
* @returns {Promise<Item>} The created item.
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
 * @returns {Promise<Item[]>} An array of items ordered by the specified criteria.
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
 * @returns {Promise<Item[]>} An array of items filtered and ordered based on the criteria.
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

/**
 * Retrieves an item from the database by its ID.
 *
 * @param {number} id - The unique identifier of the item.
 *
 * @returns {Promise<Item | null>} The item with the specified ID, or null if not found.
 */
async function getItemById(id) {
  try {
    const item = await Knex('items')
      .select('*')
      .where('id', id)
      .first();
    return item;
  } catch (error) {
    throw new Error('Error fetching item from DB.');
  }
}

/**
 * Updates the description of an item in the database.
 *
 * @param {Item} item - The item to update.
 *
 * @returns {Promise<Item>} The updated item.
 */
function updateItemDescription(item) {
  try {
    return Knex('items')
      .where('id', item.id)
      .update({
        description: item.description,
      })
      .returning([
        'id',
        'state',
        'description',
        'createdAt',
        'completedAt',
      ]);
  } catch (error) {
    throw new Error('Error updating item in DB.');
  }
}

/**
 * Updates the state of an item in the database.
 *
 * @param {Item} item - The item to update.
 *
 * @returns {Promise<Item>} The updated item.
 */
function updateItemState(item) {
  try {
    return Knex('items')
      .where('id', item.id)
      .update({
        state: item.state,
        completedAt: Knex.fn.now(),
      })
      .returning([
        'id',
        'state',
        'description',
        'createdAt',
        'completedAt',
      ]);
  } catch (error) {
    throw new Error('Error updating item in DB.');
  }
}

/**
 * Deletes an item from the database.
 *
 * @param {number} id - The unique identifier of the item to delete.
 *
 * @returns {Promise<void>} A Promise that resolves when the item is successfully deleted.
 */
async function deleteItem(id) {
  try {
    await Knex('items')
      .where('id', id)
      .del();
  } catch (error) {
    throw new Error('Error removing item from DB.');
  }
}

module.exports = {
  add,
  getAllItemsOrderedBy,
  getItemsFilteredBy,
  getItemById,
  updateItemDescription,
  updateItemState,
  deleteItem,
};
