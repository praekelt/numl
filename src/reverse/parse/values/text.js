exports.test = test;
exports.parse = parse;
exports.inline = true;
exports.annotation = null;

var indent = require('../../../utils').indent;
var isPlainObject = require('lodash/isPlainObject');


function test(v) {
  return isPlainObject(v)
      && v.__type__ === 'text';
}


function parse(v) {
  return ['`', indent(v.value, 1), '`'].join('\n');
}
