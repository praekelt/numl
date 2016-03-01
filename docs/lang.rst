Language Reference
==================

.. _overview:

Overview
--------

A numl document represents a dialogue, and is divided up into sequences. Each
sequence is further divided up into blocks. Dialogues, sequences, and blocks
each have a _`title <titles>`, followed by _`properties <properties>`
describing them:

.. code::

   Foo the dialogue
   ================

   Bar the sequence
   ----------------
   name: bar

   Baz the block
   ~~~~~~~~~~~~~
   name: baz
   type: end
   content: `Hello, goodbye!`


.. _titles:

Titles
------

Titles are created by 'underlining' text, where text represents any character
other than newlines.

Dialogue titles are underlined using one or more ``=`` characters:

.. code::

   A dialogue title
   ================

Sequence titles are underlined using one or more ``-`` characters:

.. code::

   A sequence title
   ----------------

Block titles are underlined using one or more ``~`` characters:

.. code::

   A sequence title
   ~~~~~~~~~~~~~~~~

.. _symbols:

Symbols
-------

Symbols are used in a few different places when defining a `property <properties>_`. Symbols start with a letter and followed by zero or more lower case letters, digits, or ``-`` characters.

The following are all valid symbols:

.. code::

   r
   r2
   foo-bar
   baz23
   foo-bar-23-baz-quux

The following are *not* valid symbols:

.. code::

   23foo
   23-foo
   -foo

.. _properties:

Properties
----------

Properties are name-value pairs describing a sequence or block. Properties take
the form ``name[type]: value``, where ``name`` is a `symbol <symbols>`_ representing the name of the property, ``type`` is a symbol representing the type of the property, and ``value`` depends on the type of property. Properties are separated by one or more lines:

.. code:

   foo[number]: 23
   bar[text]: `Hi!`
   baz[symbol]: quux


Where specified, type annotations may be ommitted:

.. code:

   foo: 23
   bar: `Hi!`
   baz: quux


.. _id-props:

Symbol properties
~~~~~~~~~~~~~~~~~

Symbol properties are used to identify or reference things in a numl document.
The most common case where they are used is to name a `sequence <sequences>`_
or `block <blocks>`_. Symbol properties use ``symbol`` as its type annotation,
and *may* be be ommitted. All of the following are valid symbol properties:

.. code::

   foo[symbol]: baz
   baz: quux
   corge: garply-waldo-23

.. _num-props:

Number properties
~~~~~~~~~~~~~~~~~

Number properties are used to represent numbers. Number properties use
``number`` as its type annotation, and *may* be ommitted. Numbers can be
integers or decimals:

.. code::
   foo[number]: 23
   bar[number]: 23.023

.. _text-props:

Text properties
~~~~~~~~~~~~~~~

Text properties are used to represent non-symbol text. Text properties use
``text`` as its type annotation, and *may* be omitted. A text property's value
starts and ends with a ````` character, can contain arbitrary text, and may
span multiple lines. Indentation is ignored for multi-line text:

.. code::

   foo: `This is text! 123@#$(*@#&$@#$`

   bar: `
      This
      is
      multi
      line
      text
   `

.. _content-props:

Content properties
~~~~~~~~~~~~~~~~~~

Content properties are used to represent text that will actually be shown to
users. Content properties use ``content`` as its type annotation, and *may not*
be omitted.

Content properties extend `text <text>`_ properties by allowing user fields to
be inserted into the text using placeholders. These placeholders take the form
``{@field}``, where ``field`` is a symbol referencing a user field.

.. code::

  text[content]: Goodbye {@msisdn}!


.. _multiple-choice-props:

Multiple choice properties
~~~~~~~~~~~~~~~~~~~~~~~~~~

Multiple choice properties are used to represent text for multiple-choice based
content. Content properties use ``multiple-choice`` as its type annotation,
which *may not* be omitted.

Multiple choice properties extend `content <content>`_ properties by allowing
each choice to be mapped to a symbol. For the case of ``choice`` blocks,
for example, this allows us to define routes and save values for the choices:

.. code::


   Favourite Colour
   ~~~~~~~~~~~~~~~~
   name: fav-colour
   type: choice
   save: colour

   question[multiple-choice]:`
     Hi {@msisdn}. What is your favourite colour?
     1. Red {=red}
     2. Blue {=blue}
   `
   routes:
     red: chose-red
     blue: chose-blue

   save:
     red: answer-red
     blue: answer-blue

.. _list-props:

List properties
~~~~~~~~~~~~~~~

List properties are used to define a list of values. They use ``list`` as the
type annotation, which *may* be omitted. List values are represented as
line-separated values prefixed with a ``-`` character:

.. code::

   foo:
     - bar
     - 23
     - `quux`

List items can have type annotations added to their ``-`` prefix:

.. code::

   foo:
     -[symbol] bar
     -[number] 23
     -[text] `quux`


.. _nested-props:

Nested properties
~~~~~~~~~~~~~~~~~

Properties may be nested:


.. code::

   foo:
      bar:
         - quux: corge
           grault: garply
         - quux: waldo
           grault: fred
