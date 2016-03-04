var omit = require('lodash/omit');
var map = require('lodash/map');
var decamilize = require('decamelize');
var template = require('./template.mst');


function reverse(dialogue) {
	return template(parseDialogue(dialogue));
}


function parseDialogue(d) {
	return {
		title: d.title,
		sequences: d.sequences.map(parseSequence),
		properties: parseProperties(omit(d, 'title', 'sequences'))
	};
}


function parseSequence(d) {
	return {
		title: d.title,
		blocks: d.blocks.map(parseBlock),
		properties: parseProperties(omit(d, 'title', 'blocks'))
	};
}


function parseBlock(d) {
	return {
		title: d.title,
		properties: parseProperties(omit(d, 'title'))
	};
}


function parseProperties(d) {
	return map(d, parseProperty);
}


function parseProperty(value, name) {
	return {
		name: dashify(name),
		value: value
	};
}


function dashify(s) {
	return decamilize(s, '-');
}


module.exports = reverse;
