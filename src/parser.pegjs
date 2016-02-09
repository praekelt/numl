{
  function conj(a, b) {
    var c = {};
    for (var k in a) if (a.hasOwnProperty(k)) c[k] = a[k];
    for (k in b) if (b.hasOwnProperty(k)) c[k] = b[k];
    return c;
  }

  function parseProperties(props) {
    var result = {};
    var n = props.length;
    var i = -1;
    var prop;

    while (++i < n) {
      prop = props[i];
      result[prop.key] = prop.value;
    }

    return result;
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
  { return conj(def, {type: type}); }


blockType
  = type:text newline lineWs* [~]+
  { return type; }


blockDef
  = properties:property*
  { return parseProperties(properties); }


property
  = key:key ':' ws* value:value ws*
  {
    return {
      key: key,
      value: value
    };
  }


key = text


value
  = number
  / string


newline
  = [\n]


ws 'whitespace'
  = [ \t\n\r]


lineWs 'line whitespace'
  = [ \t\r]


text 'text'
  = chars:[a-zA-Z0-9 ]+
  { return text(); }


number 'number'
  = sign? int frac? exp?
  { return parseFloat(text()) }


int 'integer'
  = digit+
  { return parseInt(text()) }


string 'string'
  = s:$(alphanumeric+ letter* alphanumeric*)


digit = [0-9]
point = '.'
sign = minus / plus
e = [eE]
exp = e (minus / plus)? digit+
frac = point digit+
minus = '-'
plus = '+'
zero = '0'

letter = [a-zA-Z]
alphanumeric = [a-zA-Z0-9]

