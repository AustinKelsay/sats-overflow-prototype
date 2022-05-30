import db from "../../database/db-config"

module.exports = {
  find,
};

function find(id: Number) {
  return db("questions")
    .select('questions.id','questions.user_id', 'users.username', 'users.node_alias', 'questions.title', 'questions.description', 'questions.votes', 'questions.bounty', 'questions.answered')
    .where({user_id: id})
}