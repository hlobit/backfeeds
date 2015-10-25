var bookshelf = require('../bookshelf');

// DUMMY AUTHENTICATION & REGISTRATION STRATEGY
module.exports = function getCurrentUser(request, response, next) {

  // IF THERE IS NO USER HEADER, YOU CAN'T DO ANYTHING
  if(!request.headers.user) {
    response.status(401).send('Please log as a user.');
    return;
  }

  // FIND OR CREATE THE USER
  bookshelf.model('User')
    .where({ username: request.headers.user })
    .fetch()
    .then(function(user) {
      if(user){
        request.currentUser = user;
      } else {
        bookshelf.model('User')
          .forge({ username: request.body.username })
          .save();
      }
    });

  // SET THE HEADER	FOR THE RESPONSE
  response.set({ 'User': request.headers.user });
  next();

};
