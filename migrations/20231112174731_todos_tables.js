module.exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
    })
    .createTable('items', (table) => {
      table.increments('id').primary();
      table.string('state').notNullable().defaultTo('INCOMPLETE');
      table.string('description').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('completedAt').nullable();
      table.integer('userId').unsigned().notNullable();
      table.foreign('userId').references('id').inTable('users');
    });
};

module.exports.down = function (knex) {
  return knex.schema
    .dropTable('items')
    .dropTable('users');
};

module.exports.config = { transaction: false };
