/**
 * Auth controller.
 */
const { AuthService } = require('../services/index');
const Jwt = require('jsonwebtoken');

/**
 * Registers a new user.
 *
 * @param {User} user - The user to be registered.
 */
async function register(request, h) {
  try {
    const user = request.payload;
    const createdUser = await AuthService.createUser(user);

    return h.response({
      message: `User ${user.name} created successfully!`,
      userId: createdUser.id,
      accessToken: Jwt.sign(createdUser.id, 'CarlosAlcaraz'),
    }).header('Authorization', Jwt.sign(createdUser.id, 'CarlosAlcaraz')).code(200);
  } catch (error) {
    return h.response({ message: error.message }).code(400);
  }
}

module.exports = {
  register,
};
