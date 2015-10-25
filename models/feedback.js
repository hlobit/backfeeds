var bookshelf = require('../bookshelf');

require('./user');
require('./comment');
require('./notation');

var Feedback = bookshelf.Model.extend({
  tableName: 'feedbacks',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo('User');
  },
  comments: function() {
    return this.hasMany('Comment');
  },
  notations: function() {
    return this.hasMany('Notation');
  }
});

// FEEDBACK FINDER
Feedback.findById = function(request, response, next, id){
  bookshelf.model('Feedback')
    .where({ id: id })
    .fetch({ withRelated: ['user', 'comments', 'notations'] })
    .then(function(feedback) {
      if (!feedback) { response.sendStatus(404); return; };
      request.feedback = feedback;
      next();
    });
};

module.exports = bookshelf.model('Feedback', Feedback);
