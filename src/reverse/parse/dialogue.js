var omit = require('lodash/omit');
var parseProperties = require('./properties');
var parseSequence = require('./sequence');


function parse(d) {
  return {
    title: d.title,
    sequences: d.sequences.map(parseSequence),
    properties: parseProperties(omit(d, 'title', 'sequences'), 0)
  };
}


module.exports = parse;
