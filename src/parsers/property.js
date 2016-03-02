var toCamelCase = require('to-camel-case');


function parse(property) {
	return [toCamelCase(property[0]), property[1]];
}


module.exports = parse;
