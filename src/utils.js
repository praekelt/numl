var decamilize = require('decamelize');
var extend = require('lodash/extend');


function dashify(s) {
  return decamilize(s, '-');
}


function conj(a, b) {
  return extend({}, a, b);
}


exports.conj = conj;
exports.dashify = dashify;
