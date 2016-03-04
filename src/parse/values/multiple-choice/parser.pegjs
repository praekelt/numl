start
  = text:text lineWs* newline choices:choices
  {
    return {
      __type__: 'multiple-choice',
      text: text,
      choices: choices
    };
  }


choices 'choices'
  = first:choice rest:(newline c:choice lineWs* { return c; })*
  { return [first].concat(rest); }


choice 'choice'
  = digit+ '. ' text:choiceText lineWs* name:choiceName? lineWs*
  {
    return {
      text: text,
      name: name || null
    };
  }

choiceName 'choice name'
  = '{=' name:symbol '}'
  { return name; }


symbol 'symbol'
  = lcletter (lcletter / digit / dash)+
  { return text(); }


lcletter 'lower case letter'
  = [a-z]


dash '-'
  = '-'


digit 'digit'
  = [0-9]


newline 'newline'
  = [\n]


lineWs 'line whitespace'
  = [ \t\r]


choiceText 'choice text'
  = (char !'{=')+
  { return text(); }


text 'text'
  = char+
  { return text(); }


char
  = [^\t\n\r]
