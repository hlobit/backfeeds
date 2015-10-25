if(process.env.NODE_ENV == 'development') {
  require('dotenv').load();
}

if(!process.env.DATABASE_URL) {
  throw new Error('You must set the environment variable DATABASE_URL to an existing database.');
};

module.exports = {

  test: {
    client: 'sqlite3',
    connection: {
      filename: './test.sqlite3'
    }
  },

  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
