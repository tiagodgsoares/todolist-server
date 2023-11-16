/**
 * Todos service.
 */
const { FILTER } = require('../constants');
const Item = require('../persistance/item');

/**
 * Adds a new item.
 *
 * @param {number} userId - The user ID of the items.
 * @param {string} description - The description of the item to create.
 *
 * @returns {Promise<Item>} The created item.
 */
function addItem(userId, description) {
  return Item.addItem(userId, description);
}

/**
 * Gets a list of items based on filter and order criteria.
 *
 * @param {number} userId - The user ID of the items.
 * @param {string} filter - The filter criteria.
 * @param {string} order  - The order criteria.
 *
 * @returns {Promise<Item[]>} An array of items based on the filter and order criteria.
 */
function getItems(userId, filter, order) {
  if (filter === FILTER.ALL) {
    return Item.getAllItemsOrderedBy(userId, order);
  }
  return Item.getItemsFilteredBy(userId, filter, order);
}

/**
 * Edits an item in the database.
 *
 * @param {number} id           - The unique identifier of the item to edit.
 * @param {string} state        - The new state of the item (optional).
 * @param {string} description  - The new description of the item (optional).
 *
 * @returns {Promise<Item> | null} The edited item or null if not found.
 */
async function editItem(id, state, description) {
  const item = await Item.getItemById(id);

  if (!item) {
    return null;
  }
  if (item.state === FILTER.COMPLETE && description) {
    throw new Error('Cannot modify description of a completed item.');
  }
  if (state) {
    item.state = state;
    return Item.updateItemState(item);
  }
  if (description) {
    item.description = description;
    return Item.updateItemDescription(item);
  }
  throw new Error('No description or state provided.');
}

/**
 * Deletes an item from the database if it exists.
 *
 * @param {number} id - The unique identifier of the item to delete.
 *
 * @returns {Promise<void>} A Promise that resolves when the item is successfully deleted.
 */
async function deleteItem(id) {
  const item = await Item.getItemById(id);
  if (!item) {
    throw new Error('Item not found.');
  }
  return Item.deleteItem(id);
}

module.exports = {
  addItem,
  getItems,
  editItem,
  deleteItem,
};
