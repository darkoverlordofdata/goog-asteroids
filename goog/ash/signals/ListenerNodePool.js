goog.provide('ash.signals.ListenerNodePool');

/*
 * This internal class maintains a pool of deleted listener nodes for reuse by framework. This reduces
 * the overhead from object creation and garbage collection.
 */
goog.require('ash.signals.ListenerNode');


/**
 * @constructor
 */
ash.signals.ListenerNodePool = function() {}

/**
 * @type {ash.signals.ListenerNodePool}
 */
ash.signals.ListenerNodePool.prototype.tail = null;

/**
 * @type {ash.signals.ListenerNodePool}
 */
ash.signals.ListenerNodePool.prototype.cacheTail = null;

/**
 * Get listener node
 * @return {ash.signals.ListenerNode}
 */
ash.signals.ListenerNodePool.prototype.get = function() {
  var node;
  if (this.tail !== null) {
    node = this.tail;
    this.tail = this.tail.previous;
    node.previous = null;
    return node;
  } else {
    return new ash.signals.ListenerNode();
  }
};

/**
 * Dispose of listener node
 * @param {ash.signals.ListenerNode}
 */
ash.signals.ListenerNodePool.prototype.dispose = function(node) {
  node.listener = null;
  node.once = false;
  node.next = null;
  node.previous = this.tail;
  this.tail = node;
};

/**
 * Cache listener node
 * @param {ash.signals.ListenerNode}
 */
ash.signals.ListenerNodePool.prototype.cache = function(node) {
  node.listener = null;
  node.previous = this.cacheTail;
  this.cacheTail = node;
};

/**
 * Release cache
 */
ash.signals.ListenerNodePool.prototype.releaseCache = function() {
  var node;
  while (this.cacheTail !== null) {
    node = this.cacheTail;
    this.cacheTail = node.previous;
    node.next = null;
    node.previous = this.tail;
    this.tail = node;
  }
};