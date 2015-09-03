goog.provide('asteroids.components.Gun');

goog.require('asteroids.ui.Point');


/**
 * @constructor
 * @param {number}
 * @param {number}
 * @param {number}
 * @param {number}
 */
asteroids.components.Gun = function(offsetX, offsetY, _at_minimumShotInterval, _at_bulletLifetime) {
  this.minimumShotInterval = _at_minimumShotInterval;
  this.bulletLifetime = _at_bulletLifetime;
  this.shooting = false;
  this.offsetFromParent = null;
  this.timeSinceLastShot = 0;
  this.offsetFromParent = new asteroids.ui.Point(offsetX, offsetY);
}

/** @type {string} */
asteroids.components.Gun.className = 'Gun';

/** @type {boolean} */
asteroids.components.Gun.prototype.shooting = false;

/** @type {number} */
asteroids.components.Gun.prototype.timeSinceLastShot = 0;

/** @type {asteroids.ui.Point} */
asteroids.components.Gun.prototype.offsetFromParent = null;

/** @type {number} */
asteroids.components.Gun.prototype.minimumShotInterval = 0;

/** @type {number} */
asteroids.components.Gun.prototype.bulletLifetime = 0;