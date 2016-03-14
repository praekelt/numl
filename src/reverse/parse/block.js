var map = require('lodash/map');
var parseProperty = require('./property');


function parse(d) {
  return {
    title: d.title,
    properties: map(d.properties, parseProperty)
  };
}


module.exports = parse;
