var numl = require('../numl');
var dedent = require('dedent');


function str(s) {
  return dedent(s).trim();
}


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

  it("should parse sequence ids", function() {
    numl(`

      # _

      ## Foo
      id: foo

      ## Bar
      id: bar
    `)
    .should.shallowDeepEqual({
      sequences: [{
        id: 'foo'
      }, {
        id: 'bar'
      }]
    });
  });

  it("should parse block ids", function() {
    numl(`

      # _

      ## _

      ### Foo
      id: foo
      a: b

      ### Bar
      id: bar
      c: d

      ### Baz
      e: f

    `)
    .should.shallowDeepEqual({
      sequences: [{
        blocks: [{
          id: 'foo',
          properties: {a: 'b'}
        }, {
          id: 'bar',
          properties: {c: 'd'}
        }, {
          properties: {e: 'f'}
        }]
      }]
    });
  });

  it("should parse block types", function() {
    numl(`

      # _

      ## _

      ### Foo
      type: foo
      a: b

      ### Bar
      type: bar
      c: d

      ### Baz
      e: f

    `)
    .should.shallowDeepEqual({
      sequences: [{
        blocks: [{
          type: 'foo',
          properties: {a: 'b'}
        }, {
          type: 'bar',
          properties: {c: 'd'}
        }, {
          properties: {e: 'f'}
        }]
      }]
    });
  });

  it("should require newlines beween sections", function() {
    (function() {
      log(numl(`
        # a
        b: c
        ## d
        e: f
        ### g
        h: i
        ### j
        k: l
        ## m
        n: o
      `));
    })
    .should.throw(
      `SyntaxError: Expected end of input or whitespace but "#" found`);

    (function() {
      numl(`
        # a
        b: c

        ## d
        e: f
        ### g
        h: i
        ### j
        k: l
        ## m
        n: o
      `);
    })
    .should.throw(
      `SyntaxError: Expected end of input or whitespace but "#" found`);

    (function() {
      numl(`
        # a
        b: c

        ## d
        e: f
        ### g
        h: i
        ### j
        k: l

        ## m
        n: o
      `);
    })
    .should.throw(
      `SyntaxError: Expected end of input or whitespace but "#" found`);

    (function() {
      numl(`
        # a
        b: c

        ## d
        e: f

        ### g
        h: i
        ### j
        k: l

        ## m
        n: o
      `);
    })
    .should.throw(
      `SyntaxError: Expected end of input or whitespace but "#" found`);

    (function() {
      numl(`
        # a
        b: c

        ## d
        e: f

        ### g
        h: i

        ### j
        k: l

        ## m
        n: o
      `);
    })
    .should.not.throw(Error);

    (function() {
      numl(`
        # a

        ## d

        ### g

        ### j

        ## m
      `);
    })
    .should.not.throw(Error);
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

      ### _
      foo:bar 
      garply-waldo[symbol]:  fred
      baz-quux-23 [symbol] : corge-21-grault
      corge: grault
    `)
    .should.shallowDeepEqual({
      sequences: [{
        blocks: [{
          properties: {
            foo: 'bar',
            garplyWaldo: 'fred',
            bazQuux23: 'corge-21-grault',
            corge: 'grault'
          }
        }]
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
          properties: {
            foo: 'bar',
            garplyWaldo: 'fred',
            bazQuux23: 'corge-21-grault'
          }
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
      `SyntaxError: Expected end of input or whitespace but "r" found.`);

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

      ### _
      win: rar
      foo:
        bar:

          baz: quux-corge

            grault[properties]:
              garply [properties]:
                waldo: fred
    `)
    .should.shallowDeepEqual({
      sequences: [{
        blocks: [{
          properties: {
            win: 'rar',
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
          }
        }]
      }]
    });
  });

  it("should parse list properties", function() {
    numl(`
      # _

      ## _

      ### _
      win: rar
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
    `)
    .should.shallowDeepEqual({
      sequences: [{
        blocks: [{
          properties: {
            win: 'rar',
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
          }
        }]
      }]
    });
  });

  it("should parse number properties", function() {
    numl(`
      # _

      ## _

      ### _
      baz: 23
      quux: 23.23
      corge: 0
      grault: 0.0
      garply: +23
      waldo[number]: -23.23e-23
      fred [number] : -23.23
    `)
    .should.shallowDeepEqual({
      sequences: [{
        blocks: [{
          properties: {
            baz: 23,
            quux: 23.23,
            corge: 0,
            grault: 0.0,
            garply: +23,
            waldo: -23.23e-23,
            fred: -23.23
          }
        }]
      }]
    });
  });

  it("should parse text properties", function() {
    numl(`
      # _

      ## _

      ### _
      foo: \`bar baz\`
      baz: \`
        quux
          corge
            grault
      \`
      garply[text]: \`
        waldo
          fred
      \`
      rar [text]: \`
        23-!@$%^&*_ rar ポケモン
      \`
      lorem: \`\`
    `)
    .should.shallowDeepEqual({
      sequences: [{
        blocks: [{
          properties: {
            foo: {
              __type__: 'text',
              value: 'bar baz',
            },
            baz: {
              __type__: 'text',
              value: str`
                quux
                  corge
                    grault
              `
            },
            garply: {
              __type__: 'text',
              value: str`
                waldo
                  fred
              `
            },
            rar: {
              __type__: 'text',
              value: '23-!@$%^&*_ rar ポケモン'
            },
            lorem: {
              __type__: 'text',
              value: ''
            }
          }
        }]
      }]
    });
  });

  it("should parse multiple-choice properties", function() {
    numl(`
      # _

      ## _

      ### _
      question[multiple-choice]:\`
        Hi {@msisdn}. What is your favourite 色?
        1. Red {@msisdn} {=red}
        2. Blue
        3. 緑 {=green}
        4. Purple!@#$%^&*()-+ {=purple}
        23. Yellow
      \`
    `)
    .should.shallowDeepEqual({
      sequences: [{
        blocks: [{
          properties: {
            question: {
              __type__: 'multiple-choice',
              text: `Hi {@msisdn}. What is your favourite 色?`,
              choices: [{
                id: 'red',
                text: 'Red {@msisdn}'
              }, {
                text: 'Blue'
              }, {
                id: 'green',
                text: '緑'
              }, {
                id: 'purple',
                text: 'Purple!@#$%^&*()-+'
              }, {
                text: 'Yellow'
              }]
            }
          }
        }]
      }]
    });

    numl(`
      # _

      ## _

      ### _
      question[multiple-choice]:\`
        Hi {@msisdn}. What is your favourite colour?
        1. Red {@msisdn} {=red}
      \`
    `)
    .should.shallowDeepEqual({
      sequences: [{
        blocks: [{
          properties: {
            question: {
              __type__: 'multiple-choice',
              text: `Hi {@msisdn}. What is your favourite colour?`,
              choices: [{
                id: 'red',
                text: 'Red {@msisdn}'
              }]
            }
          }
        }]
      }]
    });

    numl(`
      # _

      ## _

      ### _
      question[multiple-choice]:\`
        Hi {@msisdn}. What is your favourite colour?
          1. Red {@msisdn} {=red}
          2. Blue {=blue}
      \`
    `)
    .should.shallowDeepEqual({
      sequences: [{
        blocks: [{
          properties: {
            question: {
              __type__: 'multiple-choice',
              text: `Hi {@msisdn}. What is your favourite colour?`,
              choices: [{
                id: 'red',
                text: 'Red {@msisdn}'
              }, {
                id: 'blue',
                text: 'Blue'
              }]
            }
          }
        }]
      }]
    });

    (function() {
      numl(`
        # _

        ## _

        ### _
        question[multiple-choice]:\`
          Hi {@msisdn}. What is your favourite colour?
          rar
        \`
      `);
    })
    .should.throw(`SyntaxError: Expected choices but "r" found.`);
  });
});
