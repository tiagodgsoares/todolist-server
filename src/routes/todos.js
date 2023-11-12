/**
 * Todos routes.
 */
const Joi = require('joi');
const { TodosController } = require('../controllers/index');

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
];
