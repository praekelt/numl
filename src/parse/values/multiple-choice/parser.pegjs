start
  = text:text lineWs* newline choices:choices
  {
    return {
      text: text,
      choices: choices
    };
  }


choices 'choices'
  = first:choice rest:(newline c:choice lineWs* { return c; })*
  { return [first].concat(rest); }


choice 'choice'
  = digit+ '. ' text:text
  {
    return {
      text: text
    };
  }


digit 'digit'
  = [0-9]


newline 'newline'
  = [\n]


ws 'whitespace'
  = [ \t\n\r]


lineWs 'line whitespace'
  = [ \t\r]


text 'text'
  = [^\t\n\r]+
  { return text(); }
