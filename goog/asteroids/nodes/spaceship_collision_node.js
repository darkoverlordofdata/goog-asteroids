goog.provide('asteroids.nodes.SpaceshipCollisionNode');
goog.require('ash.core.Node');
goog.require('asteroids.components.Spaceship');
goog.require('asteroids.components.Position');
goog.require('asteroids.components.Collision');
goog.require('asteroids.components.Audio');
/*
  * @constructor
 */
asteroids.nodes.SpaceshipCollisionNode = function() {
  return asteroids.nodes.SpaceshipCollisionNode.superClass_.constructor.apply(this, arguments);
}
goog.inherits(asteroids.nodes.SpaceshipCollisionNode, ash.core.Node);

/** @type {string} */
asteroids.nodes.SpaceshipCollisionNode.className = 'SpaceshipCollisionNode';

/** @type {Object.<string, Function} */
asteroids.nodes.SpaceshipCollisionNode.components = {
  spaceship: asteroids.components.Spaceship,
  position: asteroids.components.Position,
  collision: asteroids.components.Collision,
  audio: asteroids.components.Audio
};

/** @type {asteroids.components.Spaceship} */
asteroids.nodes.SpaceshipCollisionNode.prototype.spaceship = null;

/** @type {asteroids.components.Position} */
asteroids.nodes.SpaceshipCollisionNode.prototype.position = null;

/** @type {asteroids.components.Collision} */
asteroids.nodes.SpaceshipCollisionNode.prototype.collision = null;

/** @type {asteroids.components.Audio} */
asteroids.nodes.SpaceshipCollisionNode.prototype.audio = null;