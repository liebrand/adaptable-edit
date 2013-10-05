/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * @fileoverview
 *
 * layman's IME to differentiate between insert/delete character
 * and split/merge tree nodes (aka splitting a paragraph when hitting a
 * carriage return)
 *
 * @author jelte@google.com (Jelte Liebrand)
 */

var IME = function(emitter) {

  document.body.addEventListener('keypress', function(evt) {
    // block all normal behaviour from happening...
    evt.preventDefault();
    var letter = String.fromCharCode(evt.charCode);
    emitter.emit('insertText', {text: letter});
  });

  document.body.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 8) {
      evt.preventDefault();
      var action = evt.shiftKey ? 'forwardDelete' : 'backwardDelete';
      emitter.emit(action);
    }
    if (evt.keyCode === 13) {
      evt.preventDefault();
      emitter.emit('splitTree');
    }
  });
};
