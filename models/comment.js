var bookshelf = require('../bookshelf');

require('./user');
require('./feedback');

var Comment = bookshelf.Model.extend({
  tableName: 'comments',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo('User');
  },
  feedback: function() {
    return this.belongsTo('Feedback');
  }
});

module.exports = bookshelf.model('Comment', Comment);
