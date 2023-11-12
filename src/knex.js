const Knex = require('knex');
const Knexfile = require('../knexfile');

module.exports = Knex(Knexfile.development);
