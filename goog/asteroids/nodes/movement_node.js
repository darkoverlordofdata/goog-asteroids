goog.provide('asteroids.nodes.MovementNode');
goog.require('ash.core.Node');
goog.require('asteroids.components.Position');
goog.require('asteroids.components.Motion');
/*
  * @constructor
 */
asteroids.nodes.MovementNode = function() {
  return asteroids.nodes.MovementNode.superClass_.constructor.apply(this, arguments);
}
goog.inherits(asteroids.nodes.MovementNode, ash.core.Node);

/** @type {string} */
asteroids.nodes.MovementNode.className = 'MovementNode';

/** @type {Object.<string, Function} */
asteroids.nodes.MovementNode.components = {
  position: asteroids.components.Position,
  motion: asteroids.components.Motion
};

/** @type {asteroids.components.Position} */
asteroids.nodes.MovementNode.prototype.position = null;

/** @type {asteroids.components.Motion} */
asteroids.nodes.MovementNode.prototype.motion = null;