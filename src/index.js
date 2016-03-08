var parser = require('./parser.pegjs');


function numl(input) {
  return parser.parse(input);
}


numl.SyntaxError = parser.SyntaxError;
numl.reverse = require('./reverse');
module.exports = numl;
