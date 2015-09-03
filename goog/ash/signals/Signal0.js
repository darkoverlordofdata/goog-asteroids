goog.provide('ash.signals.Signal0');
goog.require('ash.signals.SignalBase');
/**
 * @extends {ash.signals.SignalBase}
 * @constructor
 */
ash.signals.Signal0 = function() {
  return ash.signals.Signal0.superClass_.constructor.apply(this, arguments);
}
goog.inherits(ash.signals.Signal0, ash.signals.SignalBase);

/**
 * dispatch the event
 */
ash.signals.Signal0.prototype.dispatch = function() {
  var node;
  this.startDispatch();
  node = this.head;
  while (node !== null) {
    node.listener();
    if (node.once) {
      this.remove(node.listener);
    }
    node = node.next;
  }
  return this.endDispatch();
};