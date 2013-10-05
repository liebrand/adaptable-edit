Adaptable-Edit
==============

# Work in progress!

Proof of concept for an adaptable edit solution, using custom elements and core editing logic

# Adaptable

Editing rules *should* be dictated by the application business logic, not the browser. Examples:

* In a word processor, the next block element after a Heading1 might be a normal paragraph
* In a power point editor, lists can contain empty bullet items; whereas in word, enter on an empty list item takes the editor one level up in the list hierarchy

# Core Edit

The intention of this POC is to use a core editing library, which interacts with (custom) elements, to determine the editing rules. Basic elements are provided for basic editing logic. These can be extended for different behaviour

# Concepts

* Input Mechanism; responsible for turning input (eg keyboard) in to editable actions
* Selection; maintain the caret/range selection
* Core Edit; use both edit actions and selections to drive core editing rules
* (Custom) Elements; provide callbacks to Core Edit to dictate rules

