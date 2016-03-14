exports.parse = parse;
exports.inline = false;
exports.annotation = null;
exports.test = require('lodash/isArray');

var template = require('./template.mst');
var parseValue = require('../');
var conj = require('../../../../utils').conj;


function parse(values) {
  return template({
    values: values.map(function(v) {
      var value = parseValue(v);
      return conj(value, {value: value.value.trim()});
    })
  });
}
