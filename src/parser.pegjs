{
  var parse = require('./parse');
  var utils = require('./utils');
  var conj = utils.conj;
}


start
  = ws* dialogue:dialogue ws*
  { return dialogue }


dialogue 'dialogue'
  = title:dialogueTitle ws* sequences:sequences
  {
    return {
      title: title,
      sequences: sequences
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
  = (s:sequence ws* { return s; })*


sequence 'sequence'
  = title:sequenceTitle ws* properties:properties ws* blocks:blocks
  {
    return conj(properties, {
      title: title,
      blocks: blocks
    });
  }


blocks 'blocks'
  = (b:block ws* { return b; })*


block 'block'
  = title:blockTitle ws* properties:properties
  { return conj(properties, {title: title}); }


properties 'properties'
  = properties:(p:property ws* { return p; })*
  { return parse.properties(properties); }


property 'property'
  = key:symbol lineWs* type:type? lineWs* ':' lineWs* value:value
  { return parse.property(key, type, value); }


type 'type annotation'
  = '[' type:symbol ']'
  { return type; }


value 'property value'
  = (v:symbol { return parse.value('symbol', v); })
  / (v:textValue { return parse.value('text', v); })


textValue 'text value'
  = '`' newline* value:text newline* '`'
  { return value; }


digit 'digit'
  = [0-9]


lcletter 'lower case letter'
  = [a-z]


dash '-'
  = '-'


text 'text'
  = [^`]*
  { return text(); }


lineText 'line text'
  = [^\t\n\r]+
  { return text(); }


symbol 'symbol'
  = lcletter (lcletter / digit / dash)+
  { return text(); }


dash '-'
  = '-'


newline 'new line'
  = [\n]


ws 'whitespace'
  = [ \t\n\r]


lineWs 'line whitespace'
  = [ \t\r]
