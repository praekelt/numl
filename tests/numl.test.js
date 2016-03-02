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

      # 23-!@$%^&*_ rar ポケモン

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

  it("should parse symbol properties", function() {
    numl(`
      # _
      ## _
      ### _
      foo: bar
      garply-waldo: fred


      baz-quux-23: corge-21-grault
    `)
    .should.shallowDeepEqual({
      sequences: [{
        blocks: [{
          foo: 'bar',
          garplyWaldo: 'fred',
          bazQuux23: 'corge-21-grault'
        }]
      }]
    });

    (function() {
      numl(`
        # _
        ## _
        ### _
        23rar: bar
      `);
    })
    .should.throw(
      `TODO`);

    (function() {
      numl(`
        # _
        ## _
        ### _
        foo: 23rar
      `);
    })
    .should.throw(
      `TODO`);

    (function() {
      numl(`
        # _
        ## _
        ### _
        rar 23: bar
      `);
    })
    .should.throw(
      `TODO`);

    (function() {
      numl(`
        # _
        ## _
        ### _
        foo: rar 23
      `);
    })
    .should.throw(
      `TODO`);

    (function() {
      numl(`
        # _
        ## _
        ### _
        ポケモン: foo
      `);
    })
    .should.throw(
      `TODO`);

    (function() {
      numl(`
        # _
        ## _
        ### _
        foo: ポケモン
      `);
    })
    .should.throw(
      `TODO`);

    (function() {
      numl(`
        # _
        ## _
        ### _
        rar_23: bar
      `);
    })
    .should.throw(
      `TODO`);

    (function() {
      numl(`
        # _
        ## _
        ### _
        foo: rar_23
      `);
    })
    .should.throw(
      `TODO`);
  });
});