var template = require('./template.mst');
var parseValue = require('../');


function parse(v, depth) {
  return template({
    values: v.map(function(values) {
      return parseValue(values, depth + 1);
    })
  });
}


exports.parse = parse;
exports.newline = true;
exports.annotation = null;
exports.test = require('lodash/isArray');
