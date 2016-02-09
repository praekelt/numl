{
  function conj(a, b) {
    var c = {};
    for (var k in a) if (a.hasOwnProperty(k)) c[k] = a[k];
    for (k in b) if (b.hasOwnProperty(k)) c[k] = b[k];
    return c;
  }
}


dialogue
  = ws* name:dialogueName ws* sequences:sequence*
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
  = name:sequenceName ws* blocks:block* ws*
  {
    return {
      name: name,
      blocks: blocks
    };
  }


sequenceName
  = text:text newline lineWs* [-]+
  { return text; }


block
  = type:blockType ws* def:blockDef ws*
  {
    return conj(def, {type: type});
  }


blockType
  = type:text newline lineWs* [~]+
  { return type; }


blockDef
  = ws*
  { return {}; }


newline
  = [\n]


ws 'whitespace'
  = [ \t\n\r]


lineWs 'line whitespace'
  = [ \t\r]


text 'text'
  = chars:[a-zA-Z0-9 ]+
  { return text(); }
