{
  var parse = require('./parse');
  var utils = require('./utils');
  var conj = utils.conj;
}


start
  = ws* dialogue:dialogue ws*
  { return dialogue }


dialogue 'dialogue'
  = title:dialogueTitle
    properties:(ws* p:properties { return p; })?
    sequences:(blankLine ws* s:sequences { return s; })?
  {
    return {
      title: title,
      properties: properties || {},
      sequences: sequences || []
    };
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
  = first:sequence rest:(blankLine ws* s:sequence { return s; })*
  { return [first].concat(rest); }


sequence 'sequence'
  = title:sequenceTitle
    properties:(ws* p:properties { return p; })?
    blocks:(blankLine ws* b:blocks { return b; })?
  {
    return {
      title: title,
      properties: properties || {},
      blocks: blocks || []
    };
  }


blocks 'blocks'
  = first:block rest:(blankLine ws* b:block { return b; })*
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
  = key:symbol lineWs* type:type? lineWs* ':' lineWs* value:propertyValue
  { return parse.property(key, type, value); }


type 'type annotation'
  = '[' type:symbol ']'
  { return type; }


value 'value'
  = (v:symbol { return parse.value('symbol', v); })


propertyValue 'property value'
  = value
  / (v:nestedProperties { return parse.value('properties', v); })


nestedProperties 'nested properties'
  = newline ws* value:properties
  { return value; }


symbol 'symbol'
  = lcletter (lcletter / digit / dash)*
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


blankLine 'blank line'
  = newline lineWs* newline


newline 'new line'
  = [\n]


ws 'whitespace'
  = [ \t\n\r]


lineWs 'line whitespace'
  = [ \t\r]
