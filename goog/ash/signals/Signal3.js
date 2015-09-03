goog.provide('ash.signals.Signal3');
goog.require('ash.signals.SignalBase');
/**
 * @extends {ash.signals.SignalBase}
 * @constructor
 */
ash.signals.Signal3 = function() {
  return ash.signals.Signal3.superClass_.constructor.apply(this, arguments);
}
goog.inherits(ash.signals.Signal3, ash.signals.SignalBase);

/**
 * dispatch the event
 * @param {any} 
 * @param {any} 
 * @param {any}
 */
ash.signals.Signal3.prototype.dispatch = function($1, $2, $3) {
  var node;
  this.startDispatch();
  node = this.head;
  while (node !== null) {
    node.listener($1, $2, $3);
    if (node.once) {
      this.remove(node.listener);
    }
    node = node.next;
  }
  return this.endDispatch();
};