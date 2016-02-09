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

  it("should parse block types", function() {
    numl(`
      foo
      ===

      bar
      ---

      choice
      ~~~~~~

      question
      ~~~~~~~~
    `)
     .should.shallowDeepEqual({
       sequences: [{
         blocks: [{
           type: 'choice'
         }, {
           type: 'question'
         }]
       }]
     });
  });

  it("should parse block content properties", function() {
    numl(`
foo
===

bar
---

choice
~~~~~~
baz:\`
quux
  corge
    grault
\`
garply:\`
waldo
  fred
\`
    `)
     .should.shallowDeepEqual({
       sequences: [{
         blocks: [{
           baz:`
quux
  corge
    grault
           `.trim(),
           garply:`
waldo
  fred
          `.trim()
         }]
       }]
     });
  });

  it("should parse block string properties", function() {
    numl(`
      foo
      ===

      bar
      ---

      choice
      ~~~~~~
      baz: quux
      corge: grault
    `)
     .should.shallowDeepEqual({
       sequences: [{
         blocks: [{
           baz: 'quux',
           corge: 'grault'
         }]
       }]
     });
  });

  it("should parse block number properties", function() {
    numl(`
      foo
      ===

      bar
      ---

      choice
      ~~~~~~
      baz: 23
      quux: 23.23
      corge: 0
      grault: 0.0
      garply: +23
      waldo: -23.23e-23
    `)
     .should.shallowDeepEqual({
       sequences: [{
         blocks: [{
           baz: 23,
           quux: 23.23,
           corge: 0,
           grault: 0.0,
           garply: +23,
           waldo: -23.23e-23
         }]
       }]
     });
  });
});
