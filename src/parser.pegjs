{
  var parse = require('./parse');
  var utils = require('./utils');
  var conj = utils.conj;
}


start
  = ws* dialogue:dialogue ws*
  { return dialogue }


dialogue 'dialogue'
  = title:dialogueTitle ws* properties:properties? ws* sequences:sequences?
  {
    return conj(properties || {}, {
      title: title,
      sequences: sequences || []
    });
  }


dialogueTitle 'dialogue title'
  = '#' lineWs* value:text
  { return value; }


sequenceTitle 'sequence title'
  = '##' lineWs* value:text
  { return value; }


blockTitle 'block title'
  = '###' lineWs* value:text
  { return value; }


sequences 'sequences'
  = (s:sequence ws* { return s; })+


sequence 'sequence'
  = title:sequenceTitle ws* properties:properties? ws* blocks:blocks?
  {
    return conj(properties || {}, {
      title: title,
      blocks: blocks || []
    });
  }


blocks 'blocks'
  = (b:block ws* { return b; })+


block 'block'
  = title:blockTitle ws* properties:properties?
  { return conj(properties || {}, {title: title}); }


properties 'properties'
  = first:property rest:(newline ws* p:property { return p; })*
  { return parse.properties([first].concat(rest)); }


property 'property'
  = key:symbol lineWs* type:type? lineWs* ':' lineWs* value:value
  { return parse.property(key, type, value); }


type 'type annotation'
  = '[' type:symbol ']' { return type; }


value 'value'
  = (v:symbol { return parse.value('symbol', v); })


propertyValue 'property value'
  = value


symbol 'symbol'
  = lcletter (lcletter / digit / dash)+
  { return text(); }


dash '-'
  = '-'


digit 'digit'
  = [0-9]


lcletter 'lower case letter'
  = [a-z]


text 'text'
  = [^\t\n\r]+
  { return text(); }


newline 'newline'
  = [\n]


ws 'whitespace'
  = [ \t\n\r]


lineWs 'line whitespace'
  = [ \t\r]
