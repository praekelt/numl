module.exports = parse;

var parseBlock = require('./block');
var parseProperties = require('./properties');
var utils = require('../../utils');
var conj = utils.conj;
var omitNulls = utils.omitNulls;


function parse(d) {
  return {
    title: d.title,
    blocks: d.blocks.map(parseBlock),
    properties: parseProperties(conj(d.properties, omitNulls({
      id: d.id || null
    })))
  };
}
