var express = require('express')
  , bookshelf = require('../bookshelf');

var notationsRouter = express.Router({mergeParams: true});

notationsRouter.route('/')
  .get(function(request, response) {
    request.feedback
      .notations()
      .fetch()
      .then(function(notations){
        response.status(200).json(notations);
      });
  })
  .post(function(request, response) {
    request.checkBody('value', 'Invalid value : it must be an integer -1, 0 or 1.')
      .notEmpty().isInt().gte(-1).lte(1);

    var errors = request.validationErrors();
    if (errors) { response.status(422).send(errors); return; }

    // YOU MAY CHANGE YOUR NOTATION
    request.feedback
      .notations()
      .fetchOne({ user_id: request.currentUser.id })
      .then(function (notation) {
        var promise;
        if(notation) {
          promise = notation
            .save({ value: request.body.value }, { patch: true });
        } else {
          promise = request.feedback
            .notations()
            .create({ user_id: request.currentUser.id, value: request.body.value });
        }
        promise
          .then(function(notation){
            response.status(201).json(notation);
          });
      });
  });

module.exports = notationsRouter;
