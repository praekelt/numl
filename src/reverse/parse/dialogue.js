module.exports = parse;

var parseSequence = require('./sequence');
var parseProperties = require('./properties');


function parse(d) {
  return {
    title: d.title,
    sequences: d.sequences.map(parseSequence),
    properties: parseProperties(d.properties)
  };
}
