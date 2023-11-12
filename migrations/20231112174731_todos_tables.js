export function up(knex) {
  return knex.schema
    .createTable('items', (table) => {
      table.increments('id').primary();
      table.string('state').notNullable().defaultTo('INCOMPLETE');
      table.string('description').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('completedAt').nullable();
    })
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
    });
}

export function down(knex) {
  return knex.schema
    .dropTable('items')
    .dropTable('users');
}

export const config = { transaction: false };
