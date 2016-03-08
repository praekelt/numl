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
      foo: 'bar',
      sequences: [{
        title: '_',
        baz: 'quux',
        blocks: [{
          title: '_',
          corge: 'grault',
          garplyWaldo: 'fred-xxyyxx-21'
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
        foo: new Date(0)
      });
    })
    .should.throw('No type found for value "1970-01-01T00:00:00.000Z"');
  });

  it("should parse number properties", function() {
    reverse({
      title: '_',
      foo: 23,
      sequences: []
    })
    .should.equal(str`
    # _
    foo: 23
    `);
  });

  it("should parse text properties", function() {
    reverse({
      title: '_',
      sequences: [],
      foo: {
        __type__: 'text',
        value: dedent`
          Bar
          Baz
          Quux
          !@#$%^&*緑
        `
      },
      corge: {
        __type__: 'text',
        value: 'Grault Garply'
      }
    })
    .should.equal(str`
    # _
    foo: \`
      Bar
      Baz
      Quux
      !@#$%^&*緑
    \`
    corge: \`
      Grault Garply
    \`
    `);
  });

  it("should parse list properties", function() {
    reverse({
      title: '_',
      sequences: [],
      foo: [
        'bar-baz',
        {
          __type__: 'text',
          value: dedent`
            Quux
            Corge
            !@#$%^&*緑
          `
        },
        23
      ]
    })
    .should.equal(str`
    # _
    foo:
      - bar-baz
      - \`
        Quux
        Corge
        !@#$%^&*緑
      \`
      - 23
    `);
  });

  it("should parse nested properties", function() {
    reverse({
      title: '_',
      sequences: [],
      foo: {
        bar: [{
          baz: 'quux',
        }, {
          corge: 'grault',
          garply: {
            waldo: 'fred',
            xxyyxx: [
              'lazer',
              'blazer',
              23
            ],
            rar: {
              __type__: 'text',
              value: dedent`
                Unique
                New
                York
                !@#$%^&*緑
                `
            }
          }
        }]
      }
    })
    .should.equal(str`
    # _
    foo:
      bar:
        - baz: quux
        - corge: grault
          garply:
            waldo: fred
            xxyyxx:
              - lazer
              - blazer
              - 23
            rar: \`
              Unique
              New
              York
              !@#$%^&*緑
            \`
    `);
  });

  it("should parse multiple choice properties", function() {
    reverse({
      title: '_',
      sequences: [],
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
    })
    .should.equal(str`
    # _
    question[multiple-choice]: \`
      Hi {@msisdn}. What is your favourite 色?
      1. Red {@msisdn} {=red}
      2. Blue
      3. 緑 {=green}
      4. Purple!@#$%^&*()-+ {=purple}
      5. Yellow
    \`
    `);
  });
});
