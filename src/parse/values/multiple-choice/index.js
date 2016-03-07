var parser = require('./parser.pegjs');
var parseText = require('../text');
parser.SyntaxError = require('../../../errors').SyntaxError;


function parse(text) {
  return parser.parse(parseText(text).value);
}


module.exports = parse;
