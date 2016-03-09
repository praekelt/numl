var _indent = require('indent');
var extend = require('lodash/extend');
var decamilize = require('decamelize');
var extend = require('lodash/extend');


function conj(a, b) {
  return extend({}, a, b);
}


function dashify(s) {
  return decamilize(s, '-');
}


function indent(s, i) {
  return _indent(s, i * 2);
}


function indentNewlines(s, i) {
  var parts = s.split('\n');
  if (parts.length < 2) return s;
  var rest = indent(parts.slice(1).join('\n'), i);
  return [parts[0], rest].join('\n');
}


exports.conj = conj;
exports.dashify = dashify;
exports.indent = indent;
exports.indentNewlines = indentNewlines;
