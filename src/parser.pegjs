{
  function parseText(chars) {
    return chars.join('');
  }
}


dialogue
  = ws* name:dialogueName ws* dialogueBody
  {
    return {name: name};
  }


dialogueName
  = text:text newline lineWs* [=]+
  { return text; }


dialogueBody
  = .*


newline
  = [\n]


ws 'whitespace'
  = [ \t\n\r]


lineWs 'line whitespace'
  = [ \t\r]


text 'text'
  = chars:[a-zA-Z0-9 ]+
  { return parseText(chars); }
