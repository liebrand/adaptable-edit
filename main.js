
/**
 * init called by index.html onload
 */
function init() {
  var globalEmitter = new Emitter();
  var myIME = new IME(globalEmitter);
  var selection = new Selection();
  var coreEdit = new CoreEdit(globalEmitter, selection);
}