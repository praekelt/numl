var omit = require('lodash/omit');
var parseProperties = require('./properties');


function parse(d) {
  return {
    title: d.title,
    properties: parseProperties(omit(d, 'title'), 0)
  };
}


module.exports = parse;
