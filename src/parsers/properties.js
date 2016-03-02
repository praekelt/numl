var fromPairs = require('lodash/fromPairs');


function parse(properties) {
	return fromPairs(properties);
}


module.exports = parse;


