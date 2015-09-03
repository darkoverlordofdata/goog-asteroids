goog.provide('asteroids.components.GunControls');

/**
 * @constructor
 * @param {number}
 */
asteroids.components.GunControls = function(_at_trigger) {
  this.trigger = _at_trigger;
}

/** @type {string} */
asteroids.components.GunControls.className = 'GunControls';

/** @type {number} */
asteroids.components.GunControls.prototype.trigger = 0;