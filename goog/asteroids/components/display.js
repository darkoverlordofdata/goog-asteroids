goog.provide('asteroids.components.Display');

/**
 * @constructor
 * @param {CanvasRenderingContext2D}
 */
asteroids.components.Display = function(_at_graphic) {
  this.graphic = _at_graphic;
}

/** @type {string} */
asteroids.components.Display.className = 'Display';

/** @type {CanvasRenderingContext2D} */
asteroids.components.Display.prototype.graphic = 0;