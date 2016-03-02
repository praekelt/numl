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

      ## 23-!@$%^&*_ rar ポケモン

    `)
    .should.shallowDeepEqual({
       title: '23-!@$%^&*_ rar ポケモン'
    });
  });

  it("should parse sequence titles", function() {
    numl(`

      # _

      ## foo

      ## 23-!@$%^&*_ rar ポケモン

    `)
    .should.shallowDeepEqual({
       sequences: [{
         title: 'foo'
       }, {
         title: '23-!@$%^&*_ rar ポケモン'
       }]
    });
  });

  it("should parse block titles", function() {
    numl(`

    # _

    ## _

    ### foo

    ### 23-!@$%^&*_ rar ポケモン

    `)
    .should.shallowDeepEqual({
      sequences: [{
        blocks: [{
         title: 'foo'
       }, {
         title: '23-!@$%^&*_ rar ポケモン'
       }]
      }]
    });
  });
});
