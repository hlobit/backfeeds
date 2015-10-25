var express = require('express')
  , bookshelf = require('../bookshelf');

var usersRouter = express.Router();
usersRouter.param('username', bookshelf.model('User').findByUsername);

usersRouter.route('/')
  .get(function(request, response){
    bookshelf.model('User')
      .fetchAll()
      .then(function(users) {
        response.status(200).json(users);
      });
  });

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
