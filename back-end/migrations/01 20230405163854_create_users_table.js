/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('first_name');
    table.string('last_name');
    table.string('username');
    table.string('password')
  })
  .createTable('items', table =>{
    table.increments('id');
    table.integer('userid');
    table.foreign('userid').references('id').inTable('users')
    table.string('item_name');
    table.string('sci_name')
    table.text('description');
    table.integer('quantity');
    table.text('img_string');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('items')
    .dropTableIfExists('users')

};
