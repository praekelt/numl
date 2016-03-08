exports.test = test;
exports.parse = parse;
exports.inline = true;
exports.annotation = null;

var indent = require('../../../utils').indent;
var isType = require('../isType');


function test(v) {
  return isType(v, 'text');
}


function parse(v) {
  return ['`', indent(v.value, 1), '`'].join('\n');
}
