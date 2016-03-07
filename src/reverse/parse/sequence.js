var omit = require('lodash/omit');
var parseBlock = require('./block');
var parseProperties = require('./properties');


function parse(d) {
  return {
    title: d.title,
    blocks: d.blocks.map(parseBlock),
    properties: parseProperties(omit(d, 'title', 'blocks'), 0)
  };
}


module.exports = parse;
