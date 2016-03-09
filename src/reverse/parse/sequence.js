var map = require('lodash/map');
var parseBlock = require('./block');
var parseProperty = require('./property');


function parse(d) {
  return {
    title: d.title,
    blocks: d.blocks.map(parseBlock),
    properties: map(d.properties, parseProperty)
  };
}


module.exports = parse;
