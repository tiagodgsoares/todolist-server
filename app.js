const Hapi = require('@hapi/hapi');
const HapiSwagger = require('hapi-swagger');
const HapiAuthJWT = require('hapi-auth-jwt2');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Routes = require('./src/routes/index');
const { validateJWT } = require('./src/services/auth');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  await server.register([
    // Hapi Swagger
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Todos list API Documentation',
          version: '1.0.0',
        },
      },
    },
    // Hapi Auth JWT2
    HapiAuthJWT,
  ]);

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.SECRET_KEY,
    validate: validateJWT,
  });

  server.state('jwt', { isSecure: false });

  server.route(Routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
