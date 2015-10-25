var bookshelf = require('../bookshelf');

require('./user');
require('./feedback');

var Notation = bookshelf.Model.extend({
  tableName: 'notations',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo('User');
  },
  feedback: function() {
    return this.belongsTo('Feedback');
  }
});

module.exports = bookshelf.model('Notation', Notation);
