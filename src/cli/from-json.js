var open = require('fs').readFileSync;
var log = require('./log');
var reverse = require('../../numl').reverse;


function run(argv) {
  try {
    log.out(reverse(JSON.parse(open(argv.file).toString())));
  }
  catch(e) {
    log.err(e);
  }
}


exports.builder = {};
exports.handler = run;
