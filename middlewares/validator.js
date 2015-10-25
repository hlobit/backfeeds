var expressValidator = require('express-validator');

module.exports = expressValidator({
  customValidators: {
    lte: function(param, num) {
      return param <= num;
    },
    gte: function(param, num) {
      return param >= num;
    }
  }
});
