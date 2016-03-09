var identity = require('lodash/identity');


var types = {
  symbol: identity,
  number: identity,
  text: require('./text')
};


function parse(value) {
  var fn = types[value.type];

  if (!fn) throw new SyntaxError(
    'SyntaxError: Unrecognised type "' + value.type + '".');

  return fn(value.value);
}


module.exports = parse;
