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
    handler: TodosController.addItem,
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
];
