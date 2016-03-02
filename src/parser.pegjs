{
  var dedent = options.dedent;
  var extend = options.extend;
  var fromPairs = options.fromPairs;
  var toCamelCase = options.toCamelCase;


  function conj(a, b) {
    return extend({}, a, b);
  }


  function parseProperty(k, v) {
    return [toCamelCase(k), v];
  }


  function parseTextProperty(k, v) {
    return parseProperty(k, dedent(v));
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
  { return fromPairs(properties); }


property 'property'
  = symbolProperty
  / textProperty


symbolProperty 'symbol property'
  = key:symbol '[symbol]'? ':' lineWs* value:symbol
  { return parseProperty(key, value); }


textProperty 'text property'
  = key:symbol '[text]'? ':' lineWs* '`' newline* value:text newline* '`'
  { return parseTextProperty(key, value); }


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
