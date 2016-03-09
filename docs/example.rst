Example
=======

.. code::

   # Colour Dialogue

   ## Start
   name: start

   ### User dials in
   type: dial-event
   name: user-dials-in
   channels:
      -[channel] *120*123#
      -[channel] *120*456#


   ### Favourite Colour
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


   ## Red was chosen
   name: chose-red

   ### End of Red
   name: red-end
   type: end
   text[content]: I like red too, bye!
   `

   ## Blue was chosen
   name: chose-blue

   ### End of Blue
   name: blue-end
   type: end
   text[content]: Blue is okay, bye!
   `

Compiles to:

.. code:: javascript

   {
     "title": "Colour Dialogue",
     "sequences": [
       {
         "name": "start",
         "title": "Start",
         "blocks": [
           {
             "name": "user-dials-in",
             "title": "User dials in",
             "type": "dial-event",
             "channels": [
               "*120*123#",
               "*120*456#"
             ]
           },
           {
             "name": "colour",
             "title": "Favourite Colour",
             "type": "choice",
             "save": "colour",
             "content": {
               "text": "Hi {@msisdn}. What is your favourite colour?",
               "choices": [
                 {
                   "text": "Red",
                   "name": "red"
                 },
                 {
                   "text": "Blue",
                   "name": "blue"
                 }
               ]
             },
             "routes": {
               "red": "chose-red",
               "blue": "chose-blue"
             }
           }
         ]
       },
       {
         "name": "chose-red",
         "title": "Red was chsen",
         "blocks": [
           {
             "name": "red-end",
             "title": "End of Red",
             "type": "end",
             "content": {
               "text": "I like red too, bye!"
             }
           },
           {
             "name": "blue-end",
             "title": "End of Red",
             "type": "end",
             "content": {
               "text": "Blue is okay, bye!"
             }
           }
         ]
       }
     ]
   }
