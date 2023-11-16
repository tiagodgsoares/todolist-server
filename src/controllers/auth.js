/**
 * Auth controller.
 */
const { AuthService } = require('../services/index');
const Jwt = require('jsonwebtoken');

/**
 * Registers a new user.
 */
async function register(request, h) {
  try {
    const user = request.payload;
    const createdUser = await AuthService.createUser(user);

    return h.response({
      message: `User ${user.name} created successfully!`,
      userId: createdUser.id,
      accessToken: Jwt.sign(createdUser.id, process.env.SECRET_KEY),
    }).code(200);
  } catch (error) {
    return h.response({ message: 'There was a problem with your request.' }).code(400);
  }
}

/**
 * Logins a registered user.
 */
async function login(request, h) {
  try {
    const user = request.payload;
    const userId = await AuthService.findUser(user);
    return h.response({
      message: 'Login successful!',
      userId,
      accessToken: Jwt.sign(userId, process.env.SECRET_KEY),
    }).code(200);
  } catch (error) {
    return h.response({ message: error.message }).code(400);
  }
}

module.exports = {
  register,
  login,
};
