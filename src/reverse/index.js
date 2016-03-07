var template = require('./template.mst');
var parseDialogue = require('./parse/dialogue');


function reverse(dialogue) {
  return template(parseDialogue(dialogue));
}


module.exports = reverse;
