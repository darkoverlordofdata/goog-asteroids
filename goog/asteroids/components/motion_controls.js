goog.provide('asteroids.components.MotionControls');

/**
 * @constructor
 * @param {number}
 * @param {number}
 * @param {number}
 * @param {number}
 * @param {number}
 */
asteroids.components.MotionControls = function(_at_left, _at_right, _at_accelerate, _at_accelerationRate, _at_rotationRate) {
  this.left = _at_left;
  this.right = _at_right;
  this.accelerate = _at_accelerate;
  this.accelerationRate = _at_accelerationRate;
  this.rotationRate = _at_rotationRate;
}

/** @type {string} */
asteroids.components.MotionControls.className = 'MotionControls';

/** @type {number} */
asteroids.components.MotionControls.prototype.left = 0;

/** @type {number} */
asteroids.components.MotionControls.prototype.right = 0;

/** @type {number} */
asteroids.components.MotionControls.prototype.accelerate = 0;

/** @type {number} */
asteroids.components.MotionControls.prototype.accelerationRate = 0;

/** @type {number} */
asteroids.components.MotionControls.prototype.rotationRate = 0;