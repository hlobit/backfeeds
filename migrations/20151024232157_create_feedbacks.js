var schema = function(t) {
  t.increments().primary();
  t.integer('user_id').notNullable();
  t.integer('rate').notNullable();
  t.string('note');
  t.timestamps();
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable('feedbacks', schema)
    .then(function() {
      console.log('Feedbacks table created.');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('feedbacks', schema)
    .then(function() {
      console.log('Feedbacks table dropped.');
    });
};
