var parseValue = require('./values');
var toCamelCase = require('to-camel-case');
var utils = require('../utils');
var conj = utils.conj;


function parse(key, type, value) {
	value = conj(value, {type: type || value.type});
	return [toCamelCase(key), parseValue(value)];
}


module.exports = parse;
