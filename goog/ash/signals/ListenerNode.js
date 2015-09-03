goog.provide('ash.signals.ListenerNode');

/*
 * A node in the list of listeners in a signal.
 */

/**
 * @constructor
 */
ash.signals.ListenerNode = function() {}

/**
 * @param {ash.signals.ListenerNode}
 */
ash.signals.ListenerNode.prototype.previous = null;

/**
 * @param {ash.signals.ListenerNode}
 */
ash.signals.ListenerNode.prototype.next = null;

/**
 * @param {ash.signals.SignalBase}
 */
ash.signals.ListenerNode.prototype.listener = null;

/**
 * @param {boolean}
 */
ash.signals.ListenerNode.prototype.once = false;