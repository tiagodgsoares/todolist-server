/**
 * Todos controller.
 */
const { TodosService } = require('../services/index');

/**
 * Adds a new to-do item.
 */
async function addTodo(request, h) {
  const { description } = request.payload;
  const userId = request.auth.credentials.id; // TODO: update this later

  try {
    const newTodo = await TodosService.addItem(description, userId);

    if (!newTodo) { throw new Error('There was a problem creating the new item'); }

    return h.response(newTodo).code(201);
  } catch (error) {
    return h.response({ message: error.message }).code(400);
  }
}

/**
 * Gets a list of to-do items.
 */
async function getTodos(request, h) {
  try {
    const todos = await TodosService.getItems(request.query.filter, request.query.orderBy);
    return h.response(todos).code(200);
  } catch (error) {
    return h.response({ message: error.message }).code(400);
  }
}

/**
 * Edits a to-do item.
 */
async function editTodo(request, h) {
  try {
    const { id } = request.params;
    const { state, description } = request.payload;
    const editedTodo = await TodosService.editItem(id, state, description);

    if (!editedTodo) {
      return h.response({ message: 'Item not found.' }).code(404);
    }
    return h.response(editedTodo).code(200);
  } catch (error) {
    return h.response({ message: error.message }).code(400);
  }
}

/**
 * Removes a to-do item.
 */
async function removeTodo(request, h) {
  try {
    const { id } = request.params;
    await TodosService.deleteItem(id);
    return h.response().code(204);
  } catch (error) {
    return h.response({ message: error.message }).code(404);
  }
}

module.exports = {
  addTodo,
  getTodos,
  editTodo,
  removeTodo,
};
