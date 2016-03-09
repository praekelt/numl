module.exports = parse;

var parseProperties = require('./properties');


function parse(d) {
  return {
    title: d.title,
    properties: parseProperties(d.properties)
  };
}
