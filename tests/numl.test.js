var numl = require('../numl');
var chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
chai.should();


describe("numl", function() {
  it("should parse dialogue names", function() {
    numl(`
      foo
      ===
    `)
     .should.shallowDeepEqual({
       name: 'foo'
     });
  });

  it("should parse sequence names", function() {
    numl(`
      foo
      ===

      bar
      ---

      baz
      ---
    `)
     .should.shallowDeepEqual({
       sequences: [{
         name: 'bar'
       }, {
         name: 'baz'
       }]
     });
  });
});
