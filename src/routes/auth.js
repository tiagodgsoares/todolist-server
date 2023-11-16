/**
 * Auth routes - to be implemented.
 */
const Joi = require('joi');
const { AuthController } = require('../controllers/index');

module.exports = [
  {
    method: 'POST',
    path: '/users',
    handler: AuthController.register,
    options: {
      tags: ['api'],
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/login',
    handler: AuthController.login,
    options: {
      tags: ['api'],
      validate: {
        payload: Joi.object({
          email: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
    },
  },
];
