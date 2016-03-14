var isPlainObject = require('lodash/isPlainObject');


function isType(v, type) {
  return isPlainObject(v)
      && v.__type__ === type;
}


module.exports = isType;
