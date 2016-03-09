var parser = require('./parser.pegjs');
var errors = require('./errors');
var extend = require('lodash/extend');


function numl(input) {
  return parser.parse(input);
}


extend(numl, errors);
module.exports = numl;
