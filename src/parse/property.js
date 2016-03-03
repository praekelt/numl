var toCamelCase = require('to-camel-case');


function parse(key, value) {
	return [toCamelCase(key), value];
}


module.exports = parse;
