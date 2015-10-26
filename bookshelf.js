var knexfile = require('./knexfile.js');
var knex = require('knex')(knexfile.development);

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
bookshelf.plugin('virtuals');

module.exports = bookshelf;

require('./models/feedback');
require('./models/user');
