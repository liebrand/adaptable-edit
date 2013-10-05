
/**
 * converts IME actions in to node operations. something like:
 *
 * insertText -> insertText
 * backwardDelete -> either:
 *                          -> backwardDelete, or
 *                          -> mergeNodes
 *
 * splitTree -> for all nodes that 'supportSplit' in tree:
 *               1- createNewNextNode
 *               2- moveContent
 *
 * @param name {boolean} argument for x y z
 */


var CoreEdit = function(emitter, selection) {

  emitter.on('insertText', function(data) {
    var node = selection.findSupportingNode('insertText');
    if (node && node.insertText) {
      var currentIP = selection.insertionPoint()
      data.insertionPoint = currentIP;
      if (node.insertText(data)) {
        // insert succeeded, move insertion point
        // TODO(jliebrand): selection should not be the responsibility of
        // CoreEdit!
        selection.setInsertionPoint({
          container: currentIP.container,
          offset: currentIP.offset + 1
        });
      }
    }
  });

  emitter.on('forwardDelete', function(data) {
  });

  emitter.on('backwardDelete', function(data) {
  });


  emitter.on('splitTree', function(data) {
    var newIP;
    var currentIP = selection.insertionPoint()
    // TODO(jliebrand): this algorithm should be smarter... char runs should
    // not "split" unless a block level parent supports split....
    // for POC this will work but for the real thing we might want
    // to use promises or something
    selection.walkUp(function(node) {
      // TODO(jliebrand): need to find a better way to deal with
      // TEXT_NODES, for now ignore them by jumping up to the parent
      if (node.nodeType !== Node.TEXT_NODE) {
        if (node.supportsSplit) {

          var newPeer = node.createNewNextNode({insertionPoint: currentIP});
          // insert after existing node in dom by using insertBefore twice
          node.parentNode.insertBefore(newPeer, node);
          node.parentNode.insertBefore(node, newPeer);

          // now move the content
          node.moveContent({
            insertionPoint: currentIP,
            newNode: newPeer
          });

          // TODO(jliebrand): should not do selection setting in CoreEdit
          var temp = newPeer.firstChild;
          if (!newIP) {
            newIP = {
              container: temp.nodeType === Node.TEXT_NODE ? temp : newPeer,
              offset: 0
            };
            currentIP = newIP;
          }


        } else {
          // stop walking the tree, we've reached the end of the nodes
          // that support splitting the tree
          return true;
        }
      }
    });
    selection.setInsertionPoint(newIP);
  });

};

