var bookshelf = require('../bookshelf');

require('./feedback');

var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  feedbacks: function() {
    return this.hasMany('Feedback');
  },
  comments: function() {
    return this.hasMany('Comment');
  },
  notations: function() {
    return this.hasMany('Notation');
  }
});

module.exports = bookshelf.model('User', User);
