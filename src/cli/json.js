var log = require('./log');


function run(argv) {
	log.err('TODO');
	log.msg(argv.file);
}


exports.builder = {};
exports.handler = run;
