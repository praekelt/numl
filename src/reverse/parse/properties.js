var map = require('lodash/map');
var parseProperty = require('./property');


function parse(d, depth) {
  return map(d, function(v, k) {
    return parseProperty(v, k, depth);
  });
}


module.exports = parse;
