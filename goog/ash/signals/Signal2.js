goog.provide('ash.signals.Signal2');
goog.require('ash.signals.SignalBase');
/**
 * @extends {ash.signals.SignalBase}
 * @constructor
 */
ash.signals.Signal2 = function() {
  return ash.signals.Signal2.superClass_.constructor.apply(this, arguments);
}
goog.inherits(ash.signals.Signal2, ash.signals.SignalBase);

/**
 * dispatch the event
 * @param {any} 
 * @param {any}
 */
ash.signals.Signal2.prototype.dispatch = function($1, $2) {
  var node;
  this.startDispatch();
  node = this.head;
  while (node) {
    node.listener($1, $2);
    if (node.once) {
      this.remove(node.listener);
    }
    node = node.next;
  }
  return this.endDispatch();
};