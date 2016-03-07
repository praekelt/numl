var dedent = require('dedent');


function parse(text) {
  return {
    __type__: 'text',
    value: dedent(text)
  };
}


module.exports = parse;
