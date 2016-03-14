var indent = require('indent');
var isPlainObject = require('lodash/isPlainObject');


function test(v) {
  return isPlainObject(v)
      && v.__type__ === 'text';
}


function parse(v) {
  return ['`', indent(v.value, 2), '`'].join('\n');
}


exports.test = test;
exports.parse = parse;
exports.annotation = null;
