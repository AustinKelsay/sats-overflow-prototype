import db from "../../database/db-config"

module.exports = {
  find,
};

function find(id: Number) {
  return db("answers")
    .select('answers.id','answers.user_id', 'questions.id', 'users.username', 'answers.answer', 'answers.votes', 'answers.chosen_answer')
    .where({user_id: id})
}