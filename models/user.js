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

User.findByUsername = function(request, response, next, username) {
  bookshelf.model('User')
    .where({ username: username })
    .fetch({ withRelated: ['feedbacks', 'comments', 'notations'] })
    .then(function(user) {
      if (!user) { response.sendStatus(404); return; };
      request.user = user;
      next();
    });
};

module.exports = bookshelf.model('User', User);
