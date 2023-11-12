/**
 * Routes.
 */
const AuthRoute = require('./auth');
const TodosRoute = require('./todos');

module.exports = [
  ...AuthRoute,
  ...TodosRoute,
];
