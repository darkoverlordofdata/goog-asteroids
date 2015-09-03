goog.provide('ash.signals.Signal1');
goog.require('ash.signals.SignalBase');
/**
 * @extends {ash.signals.SignalBase}
 * @constructor
 */
ash.signals.Signal1 = function() {
  return ash.signals.Signal1.superClass_.constructor.apply(this, arguments);
}
goog.inherits(ash.signals.Signal1, ash.signals.SignalBase);

/**
 * dispatch the event
 * @param {any}
 */
ash.signals.Signal1.prototype.dispatch = function($1) {
  var node;
  this.startDispatch();
  node = this.head;
  while (node !== null) {
    node.listener($1);
    if (node.once) {
      this.remove(node.listener);
    }
    node = node.next;
  }
  return this.endDispatch();
};