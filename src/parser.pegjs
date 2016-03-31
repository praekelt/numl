{
  var get = require('lodash/get');
  var parse = require('./parse');
  var utils = require('./utils');
  var conj = utils.conj;
  var omitNulls = utils.omitNulls;
}


start
  = ws* dialogue:dialogue ws*
  { return dialogue }


dialogue 'dialogue'
  = title:dialogueTitle
    properties:(ws* p:properties { return p; })?
    sequences:(blankLine ws* s:sequences { return s; })?
  {
    // `properties` isn't used, reserved for potential future use
    return {
      title: title,
      sequences: sequences || []
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
  = first:sequence rest:(blankLine ws* s:sequence { return s; })*
  { return [first].concat(rest); }


sequence 'sequence'
  = title:sequenceTitle
    properties:(ws* p:properties { return p; })?
    blocks:(blankLine ws* b:blocks { return b; })?
  {
    return omitNulls({
      id: get(properties, 'id', null),
      title: title,
      blocks: blocks || []
    });
  }


blocks 'blocks'
  = first:block rest:(blankLine ws* b:block { return b; })*
  { return [first].concat(rest); }


block 'block'
  = title:blockTitle
    properties:(ws* p:properties { return p; })?
  {
    return omitNulls({
      id: get(properties, 'id', null),
      type: get(properties, 'type', null),
      title: title,
      properties: properties || {}
    });
  }


properties 'properties'
  = first:property rest:(lineWs* newline ws* p:property { return p; })*
  { return parse.properties([first].concat(rest)); }


property 'property'
  = key:symbol lineWs* type:type? lineWs* ':' lineWs* value:propertyValue
  { return parse.property(key, type, value); }


type 'type annotation'
  = '[' type:symbol ']'
  { return type; }


value 'value'
  = (v:symbol { return parse.value('symbol', v); })
  / (v:list { return parse.value('list', v); })
  / (v:textValue { return parse.value('text', v); })
  / (v:number { return parse.value('number', v); })


propertyValue 'property value'
  = value
  / (v:nestedProperties { return parse.value('properties', v); })


nestedProperties 'nested properties'
  = newline ws* value:properties
  { return value; }


// TODO indentation checking
list 'list'
  = (newline ws* item:listItem { return item; })+


listItem 'list item'
  = dash lineWs* type:type? lineWs* value:listItemValue
  { return parse.listItem(type, value); }


listItemValue 'list item value'
  = (v:properties { return parse.value('properties', v); })
  / value


symbol 'symbol'
  = lcletter (lcletter / digit / dash)*
  { return text(); }


textValue 'text value'
  = '`' newline* value:text newline* '`'
  { return value; }

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


lcletter 'lower case letter'
  = [a-z]


text 'text'
  = [^`]*
  { return text(); }


lineText 'line text'
  = [^\t\n\r]+
  { return text(); }


symbol 'symbol'
  = lcletter (lcletter / digit / dash)*
  { return text(); }


dash '-'
  = '-'


blankLine 'blank line'
  = newline lineWs* newline


newline 'new line'
  = [\n]


ws 'whitespace'
  = [ \t\n\r]


lineWs 'line whitespace'
  = [ \t\r]
