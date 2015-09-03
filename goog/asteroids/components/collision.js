goog.provide('asteroids.components.Collision');

/**
 * @constructor
 * @param {number}
 */
asteroids.components.Collision = function(_at_radius) {
  this.radius = _at_radius;
}

/** @type {string} */
asteroids.components.Collision.className = 'Collision';

/** @type {number} */
asteroids.components.Collision.prototype.radius = 0;