
var HtmlCharRunProto = Object.create(HTMLSpanElement.prototype);

HtmlCharRunProto.createdCallback = function() {
};


HtmlCharRunProto.insertText = function(data) {
  var ip = data.insertionPoint;
  if (ip) {
    if (this === ip.container || this.contains(ip.container)) {
      // insert the text
      ip.container.textContent =
          ip.container.textContent.substring(0, ip.offset) +
          data.text +
          ip.container.textContent.substring(ip.offset);

      return true;
    }
  }
}


HtmlCharRunProto.supportsSplit = true;
HtmlCharRunProto.createNewNextNode = function() {
  // clone ourselves so that new node gets the same formatting
  var newNode = this.cloneNode(false);

  // remove the ID to ensure nodes keep unique id's and remove content
  newNode.removeAttribute('id');
  newNode.textContent = '';

  newNode.appendChild(document.createElement('br'));

  return newNode;
};


HtmlCharRunProto.moveContent = function(data) {
  var ip = data.insertionPoint;
  if (ip) {
    if (this === ip.container || this.contains(ip.container)) {
      if (ip.offset < this.textContent.length) {
        data.newNode.textContent = this.textContent.substring(ip.offset);
        this.textContent = this.textContent.substring(0, ip.offset);

        // if either old or new charRun are now empty, add 'br' in
        // to them so we can place our cursor in to them
        if (data.newNode.textContent.length === 0) {
          data.newNode.appendChild(document.createElement('br'));
        }
        if (this.textContent.length === 0) {
          this.appendChild(document.createElement('br'));
        }

      }
    }
  }
};


var HtmlCharRun = document.register('html-charrun', {prototype: HtmlCharRunProto});
