goog.provide('asteroids.components.Hud');

/**
 * @constructor
 * @param {Object}
 */
asteroids.components.Hud = function(_at_view) {
  this.view = _at_view;
}

/** @type {string} */
asteroids.components.Hud.className = 'Hud';

/** @type {Object} */
asteroids.components.Hud.prototype.view = null;