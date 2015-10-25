var schema = function(t) {
  t.increments().primary();
  t.string('username').notNullable();
  t.timestamps();
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', schema)
    .then(function() {
      console.log('Users table created.');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users', schema)
    .then(function() {
      console.log('Users table dropped.');
    });
};
