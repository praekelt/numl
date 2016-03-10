var identity = require('lodash/identity');


var types = {
  'symbol': identity,
  'number': identity,
  'list': identity,
  'properties': identity,
  'text': require('./text'),
  'multiple-choice': require('./multiple-choice')
};


function parse(value) {
  var fn = types[value.type];

  if (!fn) throw new SyntaxError(
    'SyntaxError: Unrecognised type "' + value.type + '".');

  return fn(value.value);
}


module.exports = parse;
