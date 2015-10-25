var express = require('express')
  , bookshelf = require('../bookshelf');

var commentsRouter = express.Router({mergeParams: true});

commentsRouter.route('/')
  .get(function(request, response) {
    request.feedback
      .comments()
      .fetch()
      .then(function(comments){
        response.status(200).json(comments);
      });
  })
  .post(function(request, response) {
    request.feedback
      .comments()
      .create({
        user_id: request.currentUser.id,
        text: request.body.text
      })
      .then(function(comment){
        response.status(201).json(comment);
      });
  });

module.exports = commentsRouter;
