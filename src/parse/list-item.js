var parseValue = require('./values');
var utils = require('../utils');
var conj = utils.conj;


function parse(type, value) {
	value = conj(value, {type: type || value.type});
	return parseValue(value);
}


module.exports = parse;
