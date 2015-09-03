goog.provide('asteroids.nodes.SpaceshipNode');
goog.require('ash.core.Node');
goog.require('asteroids.components.Spaceship');
goog.require('asteroids.components.Position');
/*
  * @constructor
 */
asteroids.nodes.SpaceshipNode = function() {
  return asteroids.nodes.SpaceshipNode.superClass_.constructor.apply(this, arguments);
}
goog.inherits(asteroids.nodes.SpaceshipNode, ash.core.Node);

/** @type {string} */
asteroids.nodes.SpaceshipNode.className = 'SpaceshipNode';

/** @type {Object.<string, Function} */
asteroids.nodes.SpaceshipNode.components = {
  spaceship: asteroids.components.Spaceship,
  position: asteroids.components.Position
};

/** @type {asteroids.components.Spaceship} */
asteroids.nodes.SpaceshipNode.prototype.spaceship = null;

/** @type {asteroids.components.Position} */
asteroids.nodes.SpaceshipNode.prototype.position = null;