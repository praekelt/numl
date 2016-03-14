module.exports = parse;

var parseValue = require('../values');
var template = require('./template.mst');
var dashify = require('../../../utils').dashify;


function parse(value, name) {
  value = parseValue(value);

  return template({
      name: dashify(name),
      value: value.value,
      inline: value.inline,
      annotation: value.annotation
    })
    .trim();
}
