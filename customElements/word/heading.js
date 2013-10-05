
var WordHeadingProto = Object.create(HtmlParaProto);

// Our word heading automatically creates a "word-para" as the next node!
WordHeadingProto.createNewNextNode = function(data) {
  // TODO(jliebrand): this is crude, but just for conceptual ideas

  if (data.insertionPoint.container.textContent.trim() === this.textContent.trim() &&
      data.insertionPoint.offset === 0) {
    // if we split the heading at the very start, then create
    // another heading...
    return HtmlParaProto.createNewNextNode.call(this);
  }
  // else just create a normal paragraph
  return document.createElement('word-para');
};


var WordHeading = document.register('word-heading', {prototype: WordHeadingProto});
