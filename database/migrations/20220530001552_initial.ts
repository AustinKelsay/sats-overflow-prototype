import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return (knex.schema.createTable('users', (users: any) => {
        users.increments();
  
        users
            .string('username', 128)
            .notNullable()
            .unique();
      
        users
            .string('password', 128)
            .notNullable();

        users
            .timestamp('created_at')
            .defaultTo(knex.fn.now())

        users
            .boolean("admin")
            .defaultTo(0)
        
        users
            .string('host')
            .unique()
        
        users
            .string('cert')
            .unique()

        users
            .string('macaroon')
            .unique()

        users
            .string('pubkey')
            .unique()
        
    })
    .createTable('questions', (questions: any) => {
        questions.increments();

        questions
            .integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        questions
            .string('user')
            .notNullable()
            .references('username')
            .inTable('users')
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        questions
            .string('title', 256)
            .notNullable()
            .unique()

        questions
            .string('description', 1024)
            .notNullable()

        questions
            .integer('votes')
            .defaultTo(0)

        questions
            .integer('bounty')
            .notNullable()
            .defaultTo(0)
        
        questions
            .boolean('answered')
            .defaultTo(false)
    })
    .createTable('answers', (answers: any) => {
        answers.increments();

        answers
            .integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        answers
            .string('user')
            .notNullable()
            .references('username')
            .inTable('users')
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        answers
            .integer('question_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('questions')
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        answers
            .string('answer')
            .notNullable()
            .unique()
        
        answers
            .boolean('op_accepted')
            .defaultTo(false)

        answers
            .integer('votes')
            .defaultTo(0)
        
        answers
            .boolean('chosen_answer')
            .defaultTo(false)
    })
)};


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('questions')
        .dropTableIfExists('answers')
}

