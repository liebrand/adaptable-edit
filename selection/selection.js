/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * @fileoverview laymans selection module.
 *
 * @author jelte@google.com (Jelte Liebrand)
 */

var Selection = function() {

};

Selection.prototype = {
  __proto__: Object.prototype,

  insertionPoint: function() {
    var sel = window.getSelection();
    if (sel.rangeCount > 0) {
      var range = sel.getRangeAt(0);
      return {
        container: range.startContainer,
        offset: range.startOffset
      };
    }
  },

  setInsertionPoint: function(insertionPoint) {
    var range = document.createRange();
    range.setStart(insertionPoint.container, insertionPoint.offset);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  },

  walkUp: function(callback) {
    var sel = window.getSelection();
    var range;
    if (sel.rangeCount > 0) {
      range = sel.getRangeAt(0);
    }
    var container = range ? range.startContainer : undefined;
    while (container) {
      var ret = callback.call(this, container);
      if (ret) {
        return ret;
      }
      container = container.parentNode;
    }
  },


  findSupportingNode: function(funcName) {
    return this.walkUp(function(node) {
      if (node && node[funcName] !== undefined) {
        return node;
      }
    });
  }

}