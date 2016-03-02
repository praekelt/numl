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


sequenceTitle 'sequence title'
  = '##' linews* value:text
  { return value; }


blocks 'blocks'
  = (b:block ws* { return b; })*


block 'block'
  = title:blockTitle ws* properties:properties
  { return conj(properties, {title: title}); }


blockTitle 'block title'
  = '###' linews* value:text
  { return value; }


properties 'properties'
  = properties:(p:property ws* { return p; })*
  { return fromPairs(properties); }


property 'property'
  = symbolProperty


symbolProperty 'symbol property'
  = key:symbol '[symbol]'? ':' linews* value:symbol ws*
  { return parseProperty(key, value); }


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


ws 'whitespace'
  = [ \t\n\r]


linews 'line whitespace'
  = [ \t\r]
