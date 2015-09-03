goog.provide('asteroids.nodes.WaitForStartNode');
goog.require('ash.core.Node');
goog.require('asteroids.components.WaitForStart');
/*
  * @constructor
 */
asteroids.nodes.WaitForStartNode = function() {
  return asteroids.nodes.WaitForStartNode.superClass_.constructor.apply(this, arguments);
}
goog.inherits(asteroids.nodes.WaitForStartNode, ash.core.Node);

/** @type {string} */
asteroids.nodes.WaitForStartNode.className = 'WaitForStartNode';

/** @type {Object.<string, Function} */
asteroids.nodes.WaitForStartNode.components = {
  wait: asteroids.components.WaitForStart
};

/** @type {asteroids.components.WaitForStart} */
asteroids.nodes.WaitForStartNode.prototype.wait = null;