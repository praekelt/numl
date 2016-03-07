var map = require('lodash/map');
var omit = require('lodash/omit');
var parseBlock = require('./block');
var parseProperty = require('./property');


function parse(d) {
  return {
    title: d.title,
    blocks: d.blocks.map(parseBlock),
    properties: map(omit(d, 'title', 'blocks'), parseProperty)
  };
}


module.exports = parse;
