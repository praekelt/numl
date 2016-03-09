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
    return {
      title: title,
      properties: properties || {},
      sequences: sequences || []
    };
  }


dialogueTitle 'dialogue title'
  = '#' lineWs* value:text newline
  { return value; }


sequenceTitle 'sequence title'
  = '##' lineWs* value:text newline
  { return value; }


blockTitle 'block title'
  = '###' lineWs* value:text newline
  { return value; }


sequences 'sequences'
  = first:sequence rest:(newline ws* s:sequence { return s; })*
  { return [first].concat(rest); }


sequence 'sequence'
  = title:sequenceTitle
    properties:(ws* p:properties { return p; })?
    blocks:(ws* b:blocks { return b; })?
  {
    return {
      title: title,
      properties: properties || {},
      blocks: blocks || []
    };
  }


blocks 'blocks'
  = first:block rest:(newline ws* b:block { return b; })*
  { return [first].concat(rest); }


block 'block'
  = title:blockTitle
    properties:(ws* p:properties { return p; })?
  {
    return {
      title: title,
      properties: properties || {}
    };
  }


properties 'properties'
  = first:property rest:(lineWs* newline ws* p:property { return p; })*
  { return parse.properties([first].concat(rest)); }


property 'property'
  = key:symbol lineWs* type:type? lineWs* ':' lineWs* value:value
  { return parse.property(key, type, value); }


type 'type annotation'
  = '[' type:symbol ']' { return type; }


value 'value'
  = (v:symbol { return parse.value('symbol', v); })


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
