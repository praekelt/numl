exports.test = test;
exports.parse = parse;
exports.inline = true;
exports.annotation = 'multiple-choice';

var isType = require('../../isType');
var template = require('./template.mst');
var conj = require('../../../../utils').conj;


function test(v) {
  return isType(v, 'multiple-choice');
}


function parse(d) {
  return template(conj(d, {choices: d.choices.map(parseChoice)}));
}


function parseChoice(d, i) {
  return conj(d, {i: i + 1});
}
