var map = require('lodash/map');
var parseProperty = require('./property');
var parseSequence = require('./sequence');


function parse(d) {
  return {
    title: d.title,
    sequences: d.sequences.map(parseSequence),
    properties: map(d.properties, parseProperty)
  };
}


module.exports = parse;
