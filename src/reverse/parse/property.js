var parseValue = require('./values');
var dashify = require('../../utils').dashify;


function parse(value, name) {
  value = parseValue(value);

  return {
    name: dashify(name),
    value: value.value,
    annotation: value.annotation
  };
}


module.exports = parse;
