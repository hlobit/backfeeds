var schema = function(t) {
  t.increments().primary();
  t.integer('user_id').notNullable();
  t.integer('feedback_id').notNullable();
  t.string('text').notNullable();
  t.timestamps();
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', schema)
    .then(function() {
      console.log('Comments table created.');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments', schema)
    .then(function() {
      console.log('Comments table dropped.');
    });
};
