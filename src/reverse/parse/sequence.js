module.exports = parse;

var parseBlock = require('./block');
var parseProperties = require('./properties');


function parse(d) {
  return {
    title: d.title,
    blocks: d.blocks.map(parseBlock),
    properties: parseProperties(d.properties)
  };
}
