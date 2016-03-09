var dedent = require('dedent-js');
var reverse = require('../numl').reverse;


function str(s) {
  return dedent(s) + '\n';
}


describe("numl.reverse", function() {
  it("should parse dialogue titles", function() {
    reverse({
      title: 'foo',
      sequences: []
    })
    .should.equal(str`
    # foo
    `);
  });

  it("should parse sequence titles", function() {
    reverse({
      title: '_',
      sequences: [{
        title: 'foo',
        blocks: []
      }, {
        title: 'bar',
        blocks: []
      }]
    })
    .should.equal(str`
    # _

    ## foo

    ## bar
    `);
  });

  it("should parse block titles", function() {
    reverse({
      title: '_',
      sequences: [{
        title: '_',
        blocks: [{
          title: 'foo'
        }, {
          title: 'bar'
        }]
      }]
    })
    .should.equal(str`
    # _

    ## _

    ### foo

    ### bar
    `);
  });

  it("should parse symbol properties", function() {
    reverse({
      title: '_',
      properties: {foo: 'bar'},
      sequences: [{
        title: '_',
        properties: {baz: 'quux'},
        blocks: [{
          title: '_',
          properties: {
            corge: 'grault',
            garplyWaldo: 'fred-xxyyxx-21'
          }
        }]
      }]
    })
    .should.equal(str`
    # _
    foo: bar

    ## _
    baz: quux

    ### _
    corge: grault
    garply-waldo: fred-xxyyxx-21
    `);
  });

  it("should throw an error for unrecognised value types", function() {
    (function() {
      reverse({
        title: '_',
        sequences: [],
        properties: {foo: new Date(0)}
      });
    })
    .should.throw('No type found for value "1970-01-01T00:00:00.000Z"');
  });
});
