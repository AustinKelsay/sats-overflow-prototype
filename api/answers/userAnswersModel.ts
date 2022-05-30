import db from "../../database/db-config"

module.exports = {
  find,
};

function find(id: Number) {
  return db("answers")
    .select('answers.id','answers.user_id', 'questions.id', 'users.username', 'users.node_alias', 'answers.answer', 'answers.votes', 'answers.chosen_answer')
    .where({user_id: id})
}