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
  = '#' lineWs* value:lineText
  { return value; }


sequenceTitle 'sequence title'
  = '##' lineWs* value:lineText
  { return value; }


blockTitle 'block title'
  = '###' lineWs* value:lineText
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
  = key:symbol lineWs* type:type? lineWs* ':' lineWs* value:value
  { return parse.property(key, type, value); }


type 'type annotation'
  = '[' type:symbol ']' { return type; }


value 'value'
  = (v:symbol { return parse.value('symbol', v); })
  / (v:textValue { return parse.value('text', v); })


textValue 'text value'
  = '`' newline* value:text newline* '`'
  { return value; }


digit 'digit'
  = [0-9]


lcletter 'lower case letter'
  = [a-z]


text 'text'
  = [^`]*
  { return text(); }


lineText 'line text'
  = [^\t\n\r]+
  { return text(); }


symbol 'symbol'
  = lcletter (lcletter / digit / dash)*
  { return text(); }


dash '-'
  = '-'


blankLine 'blank line'
  = newline lineWs* newline


newline 'new line'
  = [\n]


ws 'whitespace'
  = [ \t\n\r]


lineWs 'line whitespace'
  = [ \t\r]
