goog.provide('asteroids.components.Position');

goog.require('asteroids.ui.Point');


/**
 * @constructor
 * @param {number}
 * @param {number}
 * @param {number}
 */
asteroids.components.Position = function(x, y, _at_rotation) {
  this.rotation = _at_rotation;
  this.position = new asteroids.ui.Point(x, y);
}

/** @type {string} */
asteroids.components.Position.className = 'Position';

/** @type {asteroids.ui.Point} */
asteroids.components.Position.prototype.position = null;

/** @type {number} */
asteroids.components.Position.prototype.rotation = 0;