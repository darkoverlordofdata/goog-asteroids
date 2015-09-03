goog.provide('asteroids.nodes.AsteroidCollisionNode');
goog.require('ash.core.Node');
goog.require('asteroids.components.Asteroid');
goog.require('asteroids.components.Position');
goog.require('asteroids.components.Collision');
goog.require('asteroids.components.Audio');
/*
  * @constructor
 */
asteroids.nodes.AsteroidCollisionNode = function() {
  return asteroids.nodes.AsteroidCollisionNode.superClass_.constructor.apply(this, arguments);
}
goog.inherits(asteroids.nodes.AsteroidCollisionNode, ash.core.Node);

/** @type {string} */
asteroids.nodes.AsteroidCollisionNode.className = 'AsteroidCollisionNode';

/** @type {Object.<string, Function} */
asteroids.nodes.AsteroidCollisionNode.components = {
  asteroid: asteroids.components.Asteroid,
  position: asteroids.components.Position,
  collision: asteroids.components.Collision,
  audio: asteroids.components.Audio
};

/** @type {asteroids.components.Asteroid} */
asteroids.nodes.AsteroidCollisionNode.prototype.asteroid = null;

/** @type {asteroids.components.Position} */
asteroids.nodes.AsteroidCollisionNode.prototype.position = null;

/** @type {asteroids.components.Collision} */
asteroids.nodes.AsteroidCollisionNode.prototype.collision = null;

/** @type {asteroids.components.Audio} */
asteroids.nodes.AsteroidCollisionNode.prototype.audio = null;