/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {userid: 1, item_name: 'Item #1', description: 'This is the first item', quantity:23},
    {userid: 1, item_name: 'Item #2', description: 'This is the second item', quantity:5},
    {userid: 2, item_name: 'Item #3', description: 'This is the third item', quantity:78},
  ]);
};
