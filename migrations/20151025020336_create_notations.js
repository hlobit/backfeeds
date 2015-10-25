var schema = function(t) {
  t.increments().primary();
  t.integer('user_id').notNullable();
  t.integer('feedback_id').notNullable();
  t.integer('value').notNullable();
  t.timestamps();

  t.unique(['user_id', 'feedback_id']);
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable('notations', schema)
    .then(function() {
      console.log('Notations table created.');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notations', schema)
    .then(function() {
      console.log('Notations table dropped.');
    });
};
