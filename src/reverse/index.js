var template = require('./template.mst');


function reverse(dialogue) {
	return template(dialogue);
}


module.exports = reverse;
