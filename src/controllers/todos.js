/**
 * Todos controller.
 */
const { TodosService } = require('../services/index');

/**
 * Adds a new item.
 *
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

/**
 * Gets a list of items.
 *
 */
async function getTodos(request, h) {
  try {
    const todos = await TodosService.getItems(request.query.filter, request.query.orderBy);
    return h.response(todos).code(200);
  } catch (error) {
    return h.response({ message: error.message }).code(400);
  }
}

module.exports = {
  addItem,
  getTodos,
};
