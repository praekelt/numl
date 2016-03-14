var open = require('fs').readFileSync;
var log = require('./log');
var numl = require('../../numl');


function run(argv) {
  try {
    log.out(JSON.stringify(numl(open(argv.file).toString())));
  }
  catch(e) {
    log.err(e);
    process.exit(1);
  }
}


exports.builder = {};
exports.handler = run;
