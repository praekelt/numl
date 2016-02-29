# Numi User Testing: numl

## Intro
- designed a text-based format for defining numi dialogues to allow us to use numi while we are still building a UI

- we want you to test out the design

- testing design, not you

- explain what dialogues, sequences and blocks are using the prototype as an example

- two parts:
  - pt 1: show an example, ask questions
  - pt 2: explain the basics of the format, shown a diagram, build a dialogue using format


## Script

### Pt 1

- show example:

- ask what the following mean:

  1. ```
  Example Dialogue
  ================
  ```

  2. ```
  Start
  -----
  name: start
  ```

  3. ```
  User dials in
  ~~~~~~~~~~~~~
  ```

  4. ```
  name: fav-colour
  ```

  5. ```
  type: choice-screen
  ```

  6. ```
  save: colour
  ```

  7. ```
  text[multiple-choice]:`
    Hi {@msisdn}. What is your favourite colour?
    1. Red {$red}
    2. Blue {$blue}
  `
  ```

  8. ```
  text[content]: `
    I like red too, bye!
  `
  ```


### Pt 2

- explain concepts:
  - titles
  - properties
  - symbols
  - names
  - type annotations
  - text properties
  - number properties
  - content properties
  - multiple choice properties
  - list properties
  - routes
  - block ordering

- show block reference

- show diagram

- ask to build dialogue
