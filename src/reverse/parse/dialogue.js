var map = require('lodash/map');
var omit = require('lodash/omit');
var parseProperty = require('./property');
var parseSequence = require('./sequence');


function parse(d) {
  return {
    title: d.title,
    sequences: d.sequences.map(parseSequence),
    properties: map(omit(d, 'title', 'sequences'), parseProperty)
  };
}


module.exports = parse;
