/**
 * Todos controller.
 */
const { TodosService } = require('../services/index');

/**
 * Adds a new item.
 *
 * @returns the created item.
*/
async function addItem(request, h) {
  const { description } = request.payload;

  try {
    const newItem = await TodosService.addItem(description);

    if (!newItem) { throw new Error('There was a problem creating the new item'); }

    return h.response(newItem).code(201);
  } catch (error) {
    return h.response({ message: error.message }).code(400);
  }
}

module.exports = {
  addItem,
};
