var parser = require('./parser.pegjs');


function numl(input) {
  return parser.parse(input);
}


numl.SyntaxError = parser.SyntaxError;
module.exports = numl;
