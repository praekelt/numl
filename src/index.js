var dedent = require('dedent');
var extend = require('lodash/extend');
var toCamelCase = require('to-camel-case');
var fromPairs = require('lodash/fromPairs');
var parser = require('./parser.pegjs');


function numl(input) {
  return parser.parse(input, {
    extend: extend,
    dedent: dedent,
    fromPairs: fromPairs,
    toCamelCase: toCamelCase
  });
}


numl.SyntaxError = parser.SyntaxError;
module.exports = numl;
