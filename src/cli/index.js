#!/usr/bin/env node
var cli = require('yargs');

var args = cli
  .usage('Usage: $0 [options] module')
  .help('help')
  .command(
    'json <file>',
    'output numl file as json',
    require('./json'))
  .argv;
