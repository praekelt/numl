var chalk = require('chalk');


function msg(s) {
	console.log(s);
}


function err(e) {
	console.error(chalk.red(e));
}


exports.msg = msg;
exports.err = err;
