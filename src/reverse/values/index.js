var types = [
  require('./symbol'),
  require('./number')
];


function parse(value) {
  var type = findMatch(value);
  if (!type) throw new Error("No type found for value " + JSON.stringify(value));

  return {
    annotation: type.annotation,
    value: type.parse(value)
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


module.exports = parse;
