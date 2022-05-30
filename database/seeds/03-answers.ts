exports.seed = function(knex: any) {
    // Deletes ALL existing entries
    return knex('answers').del()
      .then(function () {
        // Inserts seed entries
        return knex('answers').insert([
          {
            id: 1, 
            user_id: 2,
            user: 'Bob',
            question_id: 1,
            answer: "API's can be difficult, go ahead and start with a simple python flask api and work your way up from there. Check out the docs at https://flask.palletsprojects.com/en/2.0.x/api/",
            op_accepted: true,
            votes: 3,
            chosen_answer: true
          },
          {
            id: 2, 
            user_id: 3,
            user: 'Austin',
            question_id: 2,
            answer: "Just read their docs, it should be pretty straightforward...",
            op_accepted: false,
            votes: 0,
            chosen_answer: false
          }
        ]);
      });
  };