goog.provide('asteroids.nodes.GameNode');
goog.require('ash.core.Node');
goog.require('asteroids.components.GameState');
/*
  * @constructor
 */
asteroids.nodes.GameNode = function() {
  return asteroids.nodes.GameNode.superClass_.constructor.apply(this, arguments);
}
goog.inherits(asteroids.nodes.GameNode, ash.core.Node);

/** @type {string} */
asteroids.nodes.GameNode.className = 'GameNode';

/** @type {Object.<string, Function} */
asteroids.nodes.GameNode.components = {
  state: asteroids.components.GameState
};

/** @type {asteroids.components.GameState} */
asteroids.nodes.GameNode.prototype.state = null;