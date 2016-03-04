var ch = require('chalk');
var numl = require('../../numl');


function out(s) {
	console.log(s);
	return s;
}


function err(e) {
	console.error(parseErr(e));
	return e;
}


function parseErr(e) {
	return e instanceof numl.SyntaxError
		? parseSyntaxErr(e)
		: ch.red(e);
}


function parseSyntaxErr(e) {
	return ch.underline(
		ch.grey(ch.red('Syntax Error'),
		'on line', ch.cyan(e.line) + ', column', ch.cyan(e.column) + ':')) +
		'\n' + ch.red(e.message);
}


exports.out = out;
exports.err = err;
