var map = require('lodash/map');
var omit = require('lodash/omit');
var parseProperty = require('./property');


function parse(d) {
  return {
    title: d.title,
    properties: map(omit(d, 'title'), parseProperty)
  };
}


module.exports = parse;
