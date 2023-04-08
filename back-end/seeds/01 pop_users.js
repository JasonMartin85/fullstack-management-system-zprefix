/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const bcrypt = require("bcrypt")

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { first_name: 'Stephen', last_name: 'Strange', username: 'SorcererSupreme1', password: bcrypt.hashSync('TonyStarkSucks',10)},
    { first_name: 'Peter', last_name: 'Parker', username: 'FriendlyNeighbor2', password: bcrypt.hashSync('AuntMayCanNeverDie',10)},
    { first_name: 'The', last_name: 'Batman', username: 'ImBatman', password: bcrypt.hashSync('IMissMyParents',10)},
    { first_name: 'user', last_name: 'name', username: 'username', password: bcrypt.hashSync('password',10)},

  ]);
};
