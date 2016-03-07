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

  it("should allow dialogues to not have any sequences", function() {
    numl(`
      # dialogue
    `)
    .sequences.should.be.empty;
  });

  it("should allow sequences to not have any blocks", function() {
    numl(`
      # _
      ## sequence
    `)
    .sequences[0].blocks.should.be.empty;
  });

  it("should parse symbol properties", function() {
    numl(`
      # _
      win: rar

      ## _
      foo:bar
      garply-waldo[symbol]:  fred
      baz-quux-23 [symbol] : corge-21-grault

      ### _
      corge: grault
    `)
    .should.shallowDeepEqual({
      win: 'rar',
      sequences: [{
        foo: 'bar',
        garplyWaldo: 'fred',
        bazQuux23: 'corge-21-grault',
        blocks: [{corge: 'grault'}]
      }]
    });

    numl(`
      # _
      ## _
      ### _
      foo:bar
      garply-waldo[symbol]:  fred


      baz-quux-23 [symbol] : corge-21-grault
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
      `SyntaxError: Expected end of input or whitespace but "2" found.`);

    (function() {
      numl(`
        # _
        ## _
        ### _
        foo: 23rar
      `);
    })
    .should.throw(
      `SyntaxError: Expected end of input or whitespace but "f" found.`);

    (function() {
      numl(`
        # _
        ## _
        ### _
        rar 23: bar
      `);
    })
    .should.throw(
      `SyntaxError: Expected end of input or whitespace but "r" found.`);

    (function() {
      numl(`
        # _
        ## _
        ### _
        foo: rar 23
      `);
    })
    .should.throw(
      `SyntaxError: Expected end of input or whitespace but "2" found`);

    (function() {
      numl(`
        # _
        ## _
        ### _
        ポケモン: foo
      `);
    })
    .should.throw(
      `SyntaxError: Expected end of input or whitespace but "\\u30DD" found.`);

    (function() {
      numl(`
        # _
        ## _
        ### _
        foo: ポケモン
      `);
    })
    .should.throw(
      `SyntaxError: Expected end of input or whitespace but "f" found.`);

    (function() {
      numl(`
        # _
        ## _
        ### _
        rar_23: bar
      `);
    })
    .should.throw(
      `SyntaxError: Expected end of input or whitespace but "r" found.`);

    (function() {
      numl(`
        # _
        ## _
        ### _
        foo: rar_23
      `);
    })
    .should.throw(
      `SyntaxError: Expected end of input or whitespace but "_" found.`);

    (function() {
      numl(`
        # _
        ## _
        ### _
        foo: bar baz: quux
      `);
    })
    .should.throw(
      `SyntaxError: Expected end of input or whitespace but "b" found.`);
  });

  it("should throw an error for unrecognised property value types", function() {
    (function() {
      numl(`
        # _
        ## _
        ### _
        foo[bad-type]: rar_23
      `);
    })
    .should.throw(
      `SyntaxError: Unrecognised type "bad-type".`);
  });

  it("should parse nested properties", function() {
    numl(`
      # _
      ## _
      foo:
        bar:

          baz: quux-corge

          grault[properties]:
            garply [properties]:
              waldo: fred

      ### _
      win: rar
    `)
    .should.shallowDeepEqual({
      sequences: [{
        foo: {
          bar: {
            baz: 'quux-corge',
            grault: {
              garply: {
                waldo: 'fred'
              }
            }
          }
        },
        blocks: [{
          win: 'rar'
        }]
      }]
    });
  });

  it("should parse list properties", function() {
    numl(`
      # _
      ## _
      foo:
        - bar
        - baz: quux
          corge: grault
          garply: waldo
          fred:
            -[symbol] razor
            - blazer
            -[properties] lorem: dolor
                          sit: amet
      ### _
      win: rar
    `)
    .should.shallowDeepEqual({
      sequences: [{
        foo: [
          'bar',
          {
            baz: 'quux',
            corge: 'grault',
            garply: 'waldo',
            fred: [
              'razor',
              'blazer',
              {
                lorem: 'dolor',
                sit: 'amet'
              }
            ]
          }
        ],
        blocks: [{
          win: 'rar'
        }]
      }]
    });
  });
});
