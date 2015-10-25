if(process.env.NODE_ENV == 'development') {
  require('dotenv').load();
}

var express = require('express')
  , logger = require('morgan')
  , bodyParser = require('body-parser');

var validator = require('./middlewares/validator')
  , authenticator = require('./middlewares/authenticator');

var users = require('./routes/users')
  , feedbacks = require('./routes/feedbacks');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(validator);
app.use(authenticator);

app.use('/users', users);
app.use('/feedbacks', feedbacks);

module.exports = app;
