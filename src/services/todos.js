/**
 * Todos service.
 */
const Item = require('../persistance/item');

/**
 * Adds a new item.
 *
 * @param {string} description - the description of the item to create.
*
* @returns the created item. //TODO: add item typedef
*/
function addItem(description) {
  return Item.add(description);
}

module.exports = {
  addItem,
};
