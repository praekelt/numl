var parser = require('./parser.pegjs');
var toCamelCase = require('to-camel-case');
var extend = require('lodash/extend');
var fromPairs = require('lodash/fromPairs');


function numl(input) {
  return parser.parse(input, {
		extend: extend,
		fromPairs: fromPairs,
		toCamelCase: toCamelCase
	});
}


numl.SyntaxError = parser.SyntaxError;
module.exports = numl;
