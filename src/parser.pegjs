{
  var parse = require('./parse');
  var utils = require('./utils');
  var conj = utils.conj;
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
  = '#' lineWs* value:text
  { return value; }


sequenceTitle 'sequence title'
  = '##' lineWs* value:text
  { return value; }


blockTitle 'block title'
  = '###' lineWs* value:text
  { return value; }


sequences 'sequences'
  = (s:sequence ws* { return s; })*


sequence 'sequence'
  = title:sequenceTitle ws* properties:properties? ws* blocks:blocks
  {
    return conj(properties, {
      title: title,
      blocks: blocks
    });
  }


blocks 'blocks'
  = (b:block ws* { return b; })*


block 'block'
  = title:blockTitle ws* properties:properties?
  { return conj(properties, {title: title}); }


properties 'properties'
  = properties:(p:property ws* { return p; })+
  { return parse.properties(properties); }


property 'property'
  = key:symbol lineWs* type:type? lineWs* ':' lineWs* value:propertyValue
  { return parse.property(key, type, value); }


type 'type annotation'
  = '[' type:symbol ']'
  { return type; }


value 'value'
  = (v:symbol { return parse.value('symbol', v); })
  / (v:list { return parse.value('list', v); })


propertyValue 'property value'
  = value
  / (v:nestedProperties { return parse.value('properties', v); })


nestedProperties 'nested properties'
  = newline ws* value:properties
  { return value; }


list 'list'
  = (newline ws* item:listItem { return item; })+


listItem 'list item'
  = dash lineWs* type:type? lineWs* value:listItemValue
  { return parse.listItem(type, value); }


listItemValue 'list item value'
  = (v:properties { return parse.value('properties', v); })
  / value


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


newline 'new line'
  = [\n]


ws 'whitespace'
  = [ \t\n\r]


lineWs 'line whitespace'
  = [ \t\r]
