var numl = require('../../numl');
var exec = require('shelljs').exec;
var open = require('fs').readFileSync;
var str = require('dedent');


function run(args) {
  var cmd = `${__dirname}/../../src/cli/index.js ${args}`;
  var res = exec(cmd, {silent: true});

  return {
    code: res.code,
    stdout: res.stdout.trim(),
    stderr: res.stderr.trim()
  };
}


function fixture(name) {
  return `${__dirname}/fixtures/${name}`;
}


describe("$ numl json", function() {
  it("should output the json representation of the numl document", function() {
    var res = run(`json ${fixture('simple.numl')}`);
    var raw = open(fixture('simple.numl')).toString();
    res.stderr.should.be.empty;
    JSON.parse(res.stdout).should.deep.equal(numl(raw));
  });

  it("should log errors", function() {
    var res = run('json no-exist');
    res.stdout.should.be.empty;
    res.stderr.should.equal(
      `Error: ENOENT: no such file or directory, open 'no-exist'`);
  });

  it("should log syntax errors", function() {
    var res = run(`json ${fixture('syntax-error.numl')}`);
    res.stdout.should.be.empty;
    res.stderr.should.equal(str`
      Syntax Error on line 3, column 4:
      Expected end of input or whitespace but "s" found.`);
  });
});
