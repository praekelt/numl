var reverse = require('../../numl').reverse;
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


describe("$ numl from-json", function() {
  it("should output the json representation of the numl document", function() {
    var res = run(`from-json ${fixture('simple.json')}`);
    var raw = JSON.parse(open(fixture('simple.json')).toString());
    res.code.should.equal(0);
    res.stderr.should.be.empty;
    res.stdout.should.equal(reverse(raw).trim());
  });

  it("should log errors", function() {
    var res = run('from-json no-exist');
    res.code.should.equal(1);
    res.stdout.should.be.empty;
    res.stderr.should.equal(
      `Error: ENOENT: no such file or directory, open 'no-exist'`);
  });
});
