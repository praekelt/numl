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

  it("should parse symbol properties", function() {
    numl(`
      # _
      ## _
      foo:bar
      garply-waldo[symbol]:  fred
      baz-quux-23 [symbol] : corge-21-grault

      ### _
      corge: grault
    `)
    .should.shallowDeepEqual({
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
  });

  it("should throw an error for unrecognised types", function() {
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
          foo: 'bar baz',
          baz: str`
            quux
              corge
                grault
          `,
          garply: str`
            waldo
              fred
         `,
          rar: '23-!@$%^&*_ rar ポケモン',
          lorem: ''
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
          question: {
            __type__: 'multiple-choice',
            text: `Hi {@msisdn}. What is your favourite 色?`,
            choices: [{
              name: 'red',
              text: 'Red {@msisdn}'
            }, {
              name: null,
              text: 'Blue'
            }, {
              name: 'green',
              text: '緑'
            }, {
              name: 'purple',
              text: 'Purple!@#$%^&*()-+'
            }, {
              name: null,
              text: 'Yellow'
            }]
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
          question: {
            __type__: 'multiple-choice',
            text: `Hi {@msisdn}. What is your favourite colour?`,
            choices: [{
              name: 'red',
              text: 'Red {@msisdn}'
            }]
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
          question: {
            __type__: 'multiple-choice',
            text: `Hi {@msisdn}. What is your favourite colour?`,
            choices: [{
              name: 'red',
              text: 'Red {@msisdn}'
            }, {
              name: 'blue',
              text: 'Blue'
            }]
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
