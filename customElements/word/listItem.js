
var WordListItemProto = Object.create(HtmlListItemProto);

WordListItemProto.createNewNextNode = function() {

  // in MS Word we only create a new list item if the
  // current item is not empty..
  // use innerText and trim it to check for empty
  // NOTE: this is obviously not fool proof, but good enough for this POC
  if (this.innerText.trim().length === 0) {
    // break out of the list
    // TODO(jliebrand): this restarts the rest of the portion of
    // the list... which is not what word does, but again, this is just
    // a POC to show the concept
    return document.createElement('word-para');
  } else {
    return HtmlListItemProto.createNewNextNode.call(this);
  }
};


var WordListItem = document.register('word-listitem', {prototype: WordListItemProto});
