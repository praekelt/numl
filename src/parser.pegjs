{
  var parse = require('./parsers');
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
  = '#' lineWs* value:text
  { return value; }


sequenceTitle 'sequence title'
  = '##' lineWs* value:text
  { return value; }


blockTitle 'block title'
  = '###' lineWs* value:text
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
  = property:(symbolProperty / numberProperty)
  { return parse.property(property); }


symbolProperty 'symbol property'
  = key:symbol lineWs* '[symbol]'? lineWs* ':' lineWs* value:symbol
  { return [key, value]; }


numberProperty 'number property'
  = key:symbol lineWs* '[number]'? lineWs* ':' lineWs* value:number
  { return [key, value]; }


symbol 'symbol'
  = lcletter (lcletter / digit / dash)+
  { return text(); }


dash '-'
  = '-'

number 'number'
  = sign? int frac? exp?
  { return parseFloat(text()) }


int 'integer'
  = digit+
  { return parseInt(text()) }


digit 'digit'
  = [0-9]


point = '.'
sign = minus / plus
e = [eE]
exp = e (minus / plus)? digit+
frac = point digit+
minus = '-'
plus = '+'
zero = '0'


lcletter 'lower case letter'
  = [a-z]


text 'text'
  = [^\t\n\r]+
  { return text(); }


ws 'whitespace'
  = [ \t\n\r]


lineWs 'line whitespace'
  = [ \t\r]
