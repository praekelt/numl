var identity = require('lodash/identity');


function parse(name, value) {
	return (parse[name] ||identity)(value);
}


parse.property = require('./property');
parse.properties = require('./properties');
module.exports = parse;
