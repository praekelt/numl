# block types

## events

Triggers that start a sequence in a dialogue.

### `dial-event`

Triggers a dialogue to start when the user dials one of the given `channels`

```
name: foo
type: dial-event
channels:
  - `*120*8864#`
```

## screens

Blocks used to show the user text and receive input from the user.

### `choice-screen`

Presents the user with `text` and a list of choices and waits for a response. The user can be routed to a different sequence based on their choice using `routes`. If no route is given for a particular choice, the user continues on with the current sequence they are on. The user's answer can be saved as a user field for later use in the dialogue using `save`.

```
name: foo
type: choice-screen
text[multiple-choice]:`
  Hi {@msisdn}. What is your favourite colour?
  1. Red {$red}
  2. Blue {$blue}
`
routes:
  red: chose-red
  blue: chose-blue
save: fav-color
```

### `question-screen`

Shows the user the content given by `text` and waits for a response. The user's answer can be saved as a user field for later use in the dialogue using `save`.

```
name: foo
type: question-screen
text[content]:`
  What is your name?
`
save: msisdn
```

### `end-screen`

Shows the user `text` and ends the dialogue.

```
name: foo
type: end-screen
text[content]:`
  Bye!
`
```

## routing

Used to move the user to a new sequence.

### `route`

Moves the user to the sequence with the name given by `route`.

```
name: foo
type: route
route: name-of-sequence-to-route-to
```

## maternal health blocks

Blocks specific to maternal health.

### `mh-clinic-code`

Presents the user with the content given by `text`, and validates whether the user's responded with a valid clinic code.

If the user entered a valid clinic code, the user moves to the next block in the sequence. If the user entered an invalid clinic code, the user is presented with the content given by `invalid-text` until a valid clinic code is entered, in which case the user moves to the next block in the sequence.

The user's answer can be saved as a user field for later use in the dialogue using `save`.

```
name: foo
type: mh-clinic-code
text[content]:`
  Please enter a clinic code.
`
invalid-text[content]:`
  The clinic code you entered does not exist, please try again.
`
save: cc
```

### `mh-next-months`

Presents the user with `text` and the next months as choices. The number of months to show is defined using `months`. The user's answer can be saved as a user field for later use in the dialogue using `save`.

```
name: foo
type: mh-next-months
text[content]:`
 Please choose a month:
`
months: 9
save: month
```

### `mh-register`

Registers the user to receive stage-based messages. User fields need to be given for:
  - `msisdn`: the number to register for stage-based messages
  - `expected-day`: the expected day when the baby is due
  - `expected-month`: the expected month when the baby is due
  - `clinic-code`: the clinic code where the pregnancy is being registered

```
name: foo
type: mh-register
expected-month: month
expected-day: day
msisdn: msisdn
clinic-code: cc
```
