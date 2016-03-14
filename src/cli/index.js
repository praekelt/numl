#!/usr/bin/env node
var cli = require('yargs');

cli
  .usage('Usage: $0 [options] module')
  .help('help')
  .command(
    'json <file>',
    'output numl file as json',
    require('./json'))
  .command(
    'from-json <file>',
    'output json file as numl',
    require('./from-json'))
  .argv;
