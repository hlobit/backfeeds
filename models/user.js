var bookshelf = require('../bookshelf');

require('./feedback');

var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  feedbacks: function() {
    return this.hasMany('Feedback');
  }
});

module.exports = bookshelf.model('User', User);
