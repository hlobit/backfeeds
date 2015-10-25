var express = require('express')
  , bookshelf = require('../bookshelf');

var usersRouter = express.Router();

var findByUsername = function(request, response, next, username){
  bookshelf.model('User')
    .where({ username: username })
    .fetch({ withRelated: ['feedbacks', 'comments', 'notations'] })
    .then(function(user) {
      if (!user) { response.sendStatus(404); return; };
      request.user = user;
      next();
    });
};

usersRouter.param('username', findByUsername);

usersRouter.route('/:username')
  .get(function(request, response) {
    response.status(200).json(request.user);
  })
  .delete(function(request, response) {
    request.user
      .destroy()
      .then(function() { response.sendStatus(204); });
  });

module.exports = usersRouter;
