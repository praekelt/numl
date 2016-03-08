exports.test = test;
exports.parse = parse;
exports.inline = false;
exports.annotation = null;

var isPlainObject = require('lodash/isPlainObject');
var parseProperties = require('../properties');


function test(v) {
  return isPlainObject(v)
      && !('__type__' in v);
}


function parse(d) {
  return parseProperties(d);
}
