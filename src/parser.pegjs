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
  = ws* dialogue:dialogue
  { return dialogue }


dialogue 'dialogue'
  = title:dialogueTitle ws* sequences:sequences ws*
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
  = sequence*


sequence 'sequence'
  = title:sequenceTitle ws* blocks:block* ws*
  {
    return {
      title: title,
      blocks: blocks
    };
  }


sequenceTitle 'sequence title'
  = '##' linews* value:text
  { return value; }


blocks 'blocks'
  = block*


block 'block'
  = title:blockTitle ws* properties:properties ws*
  {
    return conj(properties, {title: title});
  }


blockTitle 'block title'
  = '###' linews* value:text
  { return value; }


properties 'properties'
  = properties:property*
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
