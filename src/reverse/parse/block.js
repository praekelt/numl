module.exports = parse;

var parseProperties = require('./properties');
var utils = require('../../utils');
var conj = utils.conj;
var omitNulls = utils.omitNulls;


function parse(d) {
  return {
    title: d.title,
    properties: parseProperties(conj(d.properties, omitNulls({
      id: d.id || null,
      type: d.type || null
    })))
  };
}
