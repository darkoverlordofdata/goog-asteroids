goog.provide('asteroids.components.Bullet');

/**
 * @constructor
 * @param {number}
 */
asteroids.components.Bullet = function(_at_lifeRemaining) {
  this.lifeRemaining = _at_lifeRemaining;
}

/** @type {string} */
asteroids.components.Bullet.className = 'Bullet';

/** @type {number} */
asteroids.components.Bullet.prototype.lifeRemaining = 0;