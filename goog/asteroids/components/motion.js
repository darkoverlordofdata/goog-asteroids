goog.provide('asteroids.components.Motion');

goog.require('asteroids.ui.Point');


/**
 * @constructor
 * @param {number}
 * @param {number}
 * @param {number}
 * @param {number}
 */
asteroids.components.Motion = function(velocityX, velocityY, _at_angularVelocity, _at_damping) {
  this.angularVelocity = _at_angularVelocity;
  this.damping = _at_damping;
  this.velocity = new asteroids.ui.Point(velocityX, velocityY);
}

/** @type {string} */
asteroids.components.Motion.className = 'Motion';

/** @type {number} */
asteroids.components.Motion.prototype.velocity = null;

/** @type {asteroids.ui.Point} */
asteroids.components.Motion.prototype.angularVelocity = 0;

/** @type {number} */
asteroids.components.Motion.prototype.damping = 0;