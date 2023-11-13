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

module.exports = {
  addItem,
  getItems,
};
