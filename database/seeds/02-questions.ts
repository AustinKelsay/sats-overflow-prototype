exports.seed = function(knex: any) {
    // Deletes ALL existing entries
    return knex('questions').del()
      .then(function () {
        // Inserts seed entries
        return knex('questions').insert([
          {
            id: 1, 
            user_id: 2,
            user: 'Bob',
            alias: 'test_node_1',
            title: 'How to use the API?',
            description: 'I need help with the API.',
            votes: 1,
            bounty: 100,
            answered: true
          },
          {
            id: 2, 
            user_id: 2,
            user: 'Bob',
            alias: 'test_node_1',
            title: 'How to connect polar to API?',
            description: 'I need help with connecting polar to API.',
            votes: 1,
            bounty: 69420,
            answered: false
          },
          {
            id: 3, 
            user_id: 1,
            user: 'Alice',
            alias: 'test_node_1',
            title: 'How do I run bitcoin core in testnet?',
            description: 'I have bitcoin core running but how do I swith it to testnet?',
            votes: 1,
            bounty: 333,
            answered: false
          }
        ]);
      });
  };