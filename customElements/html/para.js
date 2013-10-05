

var HtmlParaProto = Object.create(HTMLParagraphElement.prototype);

HtmlParaProto.createdCallback = function() {
};


HtmlParaProto.supportsSplit = true;
HtmlParaProto.createNewNextNode = function() {
  // clone ourselves so that new node gets the same formatting
  var newNode = this.cloneNode(false);

  // remove the ID to ensure nodes keep unique id's and remove content
  newNode.removeAttribute('id');
  while (newNode.firstChild) {
    newNode.removeChild(newNode.firstChild);
  }

  // newNode.appendChild(document.createElement('html-eop'));

  return newNode;
};


HtmlParaProto.moveContent = function(data) {
  // make sure this only ever MOVES nodes, so that anyone
  // with a reference to one of these guys, can still keep that reference
  // Note: this is probably not needed once we have a better solution for
  // selection, but defintely needed in this POC
  var ip = data.insertionPoint;
  if (ip) {
    if (this === ip.container || this.contains(ip.container)) {

      // move all child nodes RIGHT of the insertion point to the new node
      var boundaryNode = ip.container;
      if (boundaryNode.nodeType === Node.TEXT_NODE) {
        boundaryNode = boundaryNode.parentNode;
      }
      var iter = this.lastElementChild;
      while(iter) {
        var prev = iter.previousSibling;
        if (boundaryNode === iter ||
          boundaryNode.compareDocumentPosition(iter) & Node.DOCUMENT_POSITION_FOLLOWING) {
          // move it to new node
          data.newNode.insertBefore(iter, data.newNode.firstChild);
        }
        iter = prev;
      }
    }
  }
};

var HtmlPara = document.register('html-para', {prototype: HtmlParaProto});
