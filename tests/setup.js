var chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
chai.should();
global.log = log;


function log(v) {
	console.log.apply(console, arguments);
	return v;
}
