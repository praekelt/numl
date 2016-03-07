var decamilize = require('decamelize');


function dashify(s) {
  return decamilize(s, '-');
}


exports.dashify = dashify;


