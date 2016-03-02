var numl = require('../numl');


describe("numl", function() {
  it("should parse dialogue titles", function() {
    numl(`
    # foo
    `)
    .should.shallowDeepEqual({
       title: 'foo'
    });

    numl(`

      #foo

    `)
    .should.shallowDeepEqual({
       title: 'foo'
    });
  });

  it("should parse sequence titles", function() {
    numl(`
    # foo
    ## bar
    ## baz
    `)
    .should.shallowDeepEqual({
       title: 'foo',
       sequences: [{
         title: 'bar'
       }, {
         title: 'baz'
       }]
    });

    numl(`

      #foo

      ##bar

      ##baz

    `)
    .should.shallowDeepEqual({
       sequences: [{
         title: 'bar'
       }, {
         title: 'baz'
       }]
    });
  });

  it("should parse block titles", function() {
    numl(`
    # foo
    ## bar
    ### quux
    ### corge
    `)
    .should.shallowDeepEqual({
      sequences: [{
        blocks: [{
          title: 'quux'
        }, {
          title: 'corge'
        }]
      }]
    });

    numl(`
      #foo

      ##bar

      ###quux

      ###corge
    `)
    .should.shallowDeepEqual({
      sequences: [{
        blocks: [{
          title: 'quux'
        }, {
          title: 'corge'
        }]
      }]
    });
  });
});
