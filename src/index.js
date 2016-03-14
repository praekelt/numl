var parser = require('./parser.pegjs');
var errors = require('./errors');
var extend = require('lodash/extend');


function numl(input) {
  return parser.parse(input);
}


numl.SyntaxError = parser.SyntaxError;
numl.reverse = require('./reverse');
extend(numl, errors);
module.exports = numl;
