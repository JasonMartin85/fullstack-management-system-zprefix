/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { first_name: 'Stephen', last_name: 'Strange', username: 'SorcererSupreme1', password:'TonyStarkSucks'},
    { first_name: 'Peter', last_name: 'Parker', username: 'FriendlyNeighbor2', password:'AuntMayCanNeverDie'},
    { first_name: 'The', last_name: 'Batman', username: 'ImBatman', password:'IMissMyParents'},

  ]);
};
