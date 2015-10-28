var express = require('express')
  , bookshelf = require('../bookshelf');

var commentsRouter = require('./comments')
  , notationsRouter = require('./notations');

var feedbacksRouter = express.Router();
feedbacksRouter.param('id', bookshelf.model('Feedback').findById);
feedbacksRouter.use('/:id/comments', commentsRouter);
feedbacksRouter.use('/:id/notations', notationsRouter);

feedbacksRouter.route('/')
  .get(function(request, response){
    bookshelf.model('Feedback')
      .fetchAll({ withRelated: ['user', 'comments.user', 'notations'] })
      .then(function(feedbacks) {
        response.status(200).json(feedbacks);
      });
  })
  .post(function(request, response) {
    request.checkBody('rating', 'Invalid rating : it must be an integer from 1 to 5.')
      .notEmpty().isInt().gte(1).lte(5);

    var errors = request.validationErrors();
    if (errors) { response.status(422).send(errors); return; }

    request.currentUser
      .feedbacks()
      .create({
        rating: request.body.rating,
        note: request.body.note
      })
      .then(function(feedback){
        response.status(201).json(feedback);
      });
  });

feedbacksRouter.route('/:id')
  .get(function(request, response) {
    response.status(200).json(request.feedback);
  })
  .delete(function(request, response) {
    request.feedback
      .destroy()
      .then(function() { response.sendStatus(204); });
  });

module.exports = feedbacksRouter;
