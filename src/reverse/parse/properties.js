module.exports = parse;

var parseProperty = require('./property');
var map = require('lodash/map');


function parse(d) {
  return map(d, function(v, k) {
      return parseProperty(v, k);
    })
    .join('\n');
}
