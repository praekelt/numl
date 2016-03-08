var decamilize = require('decamelize');
var extend = require('lodash/extend');


function conj(a, b) {
  return extend({}, a, b);
}


function dashify(s) {
  return decamilize(s, '-');
}


exports.conj = conj;
exports.dashify = dashify;
