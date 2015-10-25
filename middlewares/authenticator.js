var bookshelf = require('../bookshelf');

// DUMMY AUTHENTICATION & REGISTRATION STRATEGY
module.exports = function getCurrentUser(request, response, next) {

  var userHeader = request.headers.user;

  // SET THE HEADER	FOR THE RESPONSE
  response.set({ 'User': userHeader });

  // IF THERE IS NO USER HEADER, YOU CAN'T DO ANYTHING
  if(!userHeader) {
    response.status(401).send('Please log as a user.');
    return;
  }

  // FIND OR CREATE THE USER
  bookshelf.model('User')
    .where({ username: userHeader })
    .fetch()
    .then(function(user) {
      if(user){
        request.currentUser = user;
        next();
      } else {
        bookshelf.model('User')
          .forge({ username: userHeader })
          .save()
          .then(function(user) {
            request.currentUser = user;
            next();
          });
      }
    });

};
