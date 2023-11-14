/**
 * Todos routes.
 */
const Joi = require('joi');
const { TodosController } = require('../controllers/index');
const { FILTER, ORDER } = require('../constants');

const path = '/todos';

module.exports = [
  {
    method: 'POST',
    path: `${path}`,
    handler: TodosController.addTodo,
    options: {
      tags: ['api'],
      validate: {
        payload: Joi.object({
          description: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: `${path}`,
    handler: TodosController.getTodos,
    options: {
      tags: ['api'],
      validate: {
        query: Joi.object({
          filter: Joi.string().valid(
            FILTER.ALL,
            FILTER.COMPLETE,
            FILTER.INCOMPLETE,
          ).default(FILTER.ALL),
          orderBy: Joi.string().valid(
            ORDER.DESCRIPTION,
            ORDER.CREATED_AT,
            ORDER.COMPLETED_AT,
          ).default(ORDER.CREATED_AT),
        }),
      },
    },
  },
  {
    method: 'PATCH',
    path: `${path}/{id}/`,
    handler: TodosController.editTodo,
    options: {
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.number().integer().min(1).required(),
        }),
        payload: Joi.object({
          state: Joi.string().valid('COMPLETE'),
          description: Joi.string(),
        }).or('state', 'description').required(),
      },
    },
  },
  {
    method: 'DELETE',
    path: `${path}/{id}/`,
    handler: TodosController.removeTodo,
    options: {
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.number().integer().min(1).required(),
        }),
      },
    },
  },
];
