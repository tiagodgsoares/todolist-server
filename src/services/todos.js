/**
 * Todos service.
 */
const { FILTER } = require('../constants');
const Item = require('../persistance/item');

/**
 * Adds a new item.
 *
 * @param {string} description - The description of the item to create.
*
* @returns {Item} The created item.
*/
function addItem(description) {
  return Item.add(description);
}

/**
 * Gets a list of items based on filter and order criteria.
 *
 * @param {string} filter - The filter criteria.
 * @param {string} order  - The order criteria.
*
* @returns {Item[]} An array of items based on the filter and order criteria.
*/
function getItems(filter, order) {
  if (filter === FILTER.ALL) {
    return Item.getAllItemsOrderedBy(order);
  }
  return Item.getItemsFilteredBy(filter, order);
}

/**
 * Edits an item in the database.
 *
 * @param {number} id           - The unique identifier of the item to edit.
 * @param {string} state        - The new state of the item (optional).
 * @param {string} description  - The new description of the item (optional).
 *
 * @returns {Item} The edited item.
 */
async function editItem(id, state, description) {
  try {
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
    return item;
  } catch (error) {
    return new Error(error);
  }
}

module.exports = {
  addItem,
  getItems,
  editItem,
};
