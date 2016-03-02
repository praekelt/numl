var parser = require('./parser.pegjs');
numl.SyntaxError = parser.SyntaxError;


function numl(input) {
  return parser.parse(input);
}
