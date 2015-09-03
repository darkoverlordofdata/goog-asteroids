goog.provide('ash.core.NodePool');

/*
 * This internal class maintains a pool of deleted nodes for reuse by the framework. This reduces the overhead
 * from object creation and garbage collection.
 *
 * Because nodes may be deleted from a NodeList while in use, by deleting Nodes from a NodeList
 * while iterating through the NodeList, the pool also maintains a cache of nodes that are added to the pool
 * but should not be reused yet. They are then released into the pool by calling the releaseCache method.
 */

/**
 * Creates a pool for the given node class.
 * 
 * @constructor
 * @param {Function} nodeClass
 * @param {ash.core.Dictionary}
 */
ash.core.NodePool = function(_at_nodeClass, _at_components) {
  this.nodeClass = _at_nodeClass;
  this.components = _at_components;
}

/**
 * @type {ash.core.Node}
 */
ash.core.NodePool.prototype.tail = null;

/**
 * @type {Function}
 */
ash.core.NodePool.prototype.nodeClass = null;

/**
 * @type {ash.core.Node}
 */
ash.core.NodePool.prototype.cacheTail = null;

/**
 * @type {ash.ext.Dictionary}
 */
ash.core.NodePool.prototype.components = null;

/**
 * Fetches a node from the pool.
 * @return {ash.core.Node}
 */
ash.core.NodePool.prototype.get = function() {
  var node;
  if (this.tail) {
    node = this.tail;
    this.tail = this.tail.previous;
    node.previous = null;
    return node;
  } else {
    node = new this.nodeClass();
    return node;
  }
};

/**
 * dispose of a node
 * @param {ash.core.Node}
 */
ash.core.NodePool.prototype.dispose = function(node) {
  var componentName;
  for (componentName in this.components) {
    node[componentName] = null;
  }
  node.entity = null;
  node.next = null;
  node.previous = this.tail;
  this.tail = node;
};

/**
 * Adds a node to the cache
 * @param {ash.core.Node}
 */
ash.core.NodePool.prototype.cache = function(node) {
  node.previous = this.cacheTail;
  this.cacheTail = node;
};

/**
 * Releases all nodes from the cache into the pool
 */
ash.core.NodePool.prototype.releaseCache = function() {
  var node;
  while (this.cacheTail) {
    node = this.cacheTail;
    this.cacheTail = node.previous;
    this.dispose(node);
  }
};