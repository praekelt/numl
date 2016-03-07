var parseValue = require('../values');
var template = require('./template.mst');
var indent = require('../../../utils').indent;
var dashify = require('../../../utils').dashify;


function parse(value, name, depth) {
  value = parseValue(value, depth);

  var res = template({
      name: dashify(name),
      value: value.value,
      newline: value.newline,
      annotation: value.annotation
    })
    .trim();

  return indent(res, depth);
}


module.exports = parse;
