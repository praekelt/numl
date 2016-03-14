module.exports = parse;

var indentNewlines = require('../../../utils').indentNewlines;


var types = [
  require('./symbol'),
  require('./number'),
  require('./text'),
  require('./list'),
  require('./properties')
];


function parse(value) {
  var type = findMatch(value);
  if (!type) throw new Error("No type found for value " + JSON.stringify(value));

  return {
    inline: type.inline,
    value: parseValue(value, type),
    annotation: type.annotation
  };
}


function parseValue(value, type) {
  value = type.parse(value);

  return !type.inline
    ? indentNewlines('\n' + value, 1)
    : value;
}


function findMatch(value) {
  var i = -1;
  var n = types.length;
  var type;

  while (++i < n) {
    type = types[i];
    if (type.test(value)) return type;
  }

  return null;
}
