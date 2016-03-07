module.exports = parse;


var types = [
  require('./symbol'),
  require('./number'),
  require('./text'),
  require('./list')
];


function parse(value, depth) {
  var type = findMatch(value);
  if (!type) throw new Error("No type found for value " + JSON.stringify(value));

  return {
    newline: type.newline,
    value: type.parse(value, depth),
    annotation: type.annotation
  };
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
