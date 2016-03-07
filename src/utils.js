var _indent = require('indent');
var decamilize = require('decamelize');


function dashify(s) {
  return decamilize(s, '-');
}


function indent(s, i) {
  return _indent(s, i * 2);
}


exports.indent = indent;
exports.dashify = dashify;
