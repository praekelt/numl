var indent = require('../../../utils').indent;
var isPlainObject = require('lodash/isPlainObject');


function test(v) {
  return isPlainObject(v)
      && v.__type__ === 'text';
}


function parse(v, depth) {
  return ['`', indent(v.value, depth + 1), indent('`', depth)].join('\n');
}


exports.test = test;
exports.parse = parse;
exports.newline = false;
exports.annotation = null;
