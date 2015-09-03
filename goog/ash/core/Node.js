goog.provide('ash.core.Node');

/**
 * @constructor
 */
ash.core.Node = function() {}

/**
 * @type {ash.core.Entity}
 */
ash.core.Node.prototype.entity = null;

/**
 * @type {ash.core.Node}
 */
ash.core.Node.prototype.previous = null;

/**
 * @type {ash.core.Node}
 */
ash.core.Node.prototype.next = null;