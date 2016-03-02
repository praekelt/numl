{
}


start
  = ws* dialogue:dialogue
  { return dialogue }


dialogue 'dialogue'
  = title:dialogueTitle ws* sequences:sequence* ws*
  {
    return {
      title: title,
      sequences: sequences
    };
  }


dialogueTitle 'dialogue title'
  = '#' linews* value:text
  { return value; }


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


block 'block'
  = title:blockTitle ws*
  {
    return {
      title: title
    };
  }


blockTitle 'block title'
  = '###' linews* value:text
  { return value; }


ws 'whitespace'
  = [ \t\n\r]


linews 'line whitespace'
  = [ \t\r]


text 'text'
  = [^\t\n\r]+
  { return text(); }
