goog.provide('asteroids.components.Animation');

/**
 * @constructor
 * @param {Object}
 */
asteroids.components.Animation = function(_at_animation) {
  this.animation = _at_animation;
}

/** @type {string} */
asteroids.components.Animation.className = 'Animation';

/** @type {Object} */
asteroids.components.Animation.prototype.animation = null;