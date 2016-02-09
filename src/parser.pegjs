{
  function parseText(chars) {
    return chars.join('');
  }
}


dialogue
  = ws* name:dialogueName ws* sequences:sequence* ws*
  {
    return {
      name: name,
      sequences: sequences
    };
  }


dialogueName
  = text:text newline lineWs* [=]+
  { return text; }


sequence
  = ws* name:sequenceName ws*
  {
    return {
      name: name,
    };
  }


sequenceName
  = text:text newline lineWs* [-]+
  { return text; }


newline
  = [\n]


ws 'whitespace'
  = [ \t\n\r]


lineWs 'line whitespace'
  = [ \t\r]


text 'text'
  = chars:[a-zA-Z0-9 ]+
  { return parseText(chars); }
