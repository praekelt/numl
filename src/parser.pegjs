{
  var extend = options.extend;
  var fromPairs = options.fromPairs;
  var toCamelCase = options.toCamelCase;

  function conj(a, b) {
    return extend({}, a, b);
  }

  function parseProperty(k, v) {
    return [toCamelCase(k), v];
  }
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
  = '#' linews* value:text
  { return value; }


sequenceTitle 'sequence title'
  = '##' linews* value:text
  { return value; }


blockTitle 'block title'
  = '###' linews* value:text
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
  { return fromPairs(properties); }


property 'property'
  = symbolProperty
  / numberProperty


symbolProperty 'symbol property'
  = key:symbol '[symbol]'? ':' linews* value:symbol
  { return parseProperty(key, value); }


numberProperty 'number property'
  = key:symbol '[number]'? ':' linews* value:number
  { return parseProperty(key, value); }


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


linews 'line whitespace'
  = [ \t\r]
