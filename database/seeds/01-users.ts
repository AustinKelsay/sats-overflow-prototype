const bcrypt = require("bcrypt");

exports.seed = function(knex: any) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
            id: 1, 
            username: 'Alice', 
            password: 
            bcrypt.hashSync('pass1', 14), 
            admin: 1,
            host: 'test_host_1', 
            cert: '6969696969696969696969696969696969696969696969696969696969696969696969',
            macaroon: '6969696969696969696969696969696969696969696969696969696969696969696969',
            pubkey: '6969696969696969696969696969696969696969696969696969696969696969696969',
            node_alias: 'test_node_1'
        },
        {
            id: 2, 
            username: 'Bob', 
            password: 
            bcrypt.hashSync('pass2', 14),
            host: 'test_host_2', 
            cert: '420420420420420420420420420420420420420420420420420420420420420420420420420',
            macaroon: '420420420420420420420420420420420420420420420420420420420420420420420420420',
            pubkey: '420420420420420420420420420420420420420420420420420420420420420420420420420',
            node_alias: 'test_node_2'
        },
        {
            id: 3, 
            username: 'Austin', 
            password: 
            bcrypt.hashSync('pass3', 14),
            host: 'test_host_3', 
            cert: '999999999999999999999999999999999999999999999999999999999999999999999999999999',
            macaroon: '99999999999999999999999999999999999999999999999999999999999999999999999999',
            pubkey: '99999999999999999999999999999999999999999999999999999999999999999999999999',
            node_alias: 'test_node_3'
        },
      ]);
    });
};