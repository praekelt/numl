var extend = require('lodash/extend');


function conj(a, b) {
	return extend({}, a, b);
}


exports.conj = conj;
