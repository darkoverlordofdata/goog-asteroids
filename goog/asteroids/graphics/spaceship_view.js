goog.provide('asteroids.graphics.SpaceshipView');

/**
 * @constructor
 * @param {CanvasRenderingContext2D}
 */
asteroids.graphics.SpaceshipView = function(_at_graphic) {
  this.graphic = _at_graphic;
}

/** @type {number} */
asteroids.graphics.SpaceshipView.prototype.x = 0;

/** @type {number} */
asteroids.graphics.SpaceshipView.prototype.y = 0;

/** @type {number} */
asteroids.graphics.SpaceshipView.prototype.width = 20;

/** @type {number} */
asteroids.graphics.SpaceshipView.prototype.height = 20;

/** @type {number} */
asteroids.graphics.SpaceshipView.prototype.rotation = 0;

/** @type {CanvasRenderingContext2D} */
asteroids.graphics.SpaceshipView.prototype.graphic = null;

/**
 * draw the view
 */
asteroids.graphics.SpaceshipView.prototype.draw = function() {
  var graphic;
  graphic = this.graphic;
  graphic.save();
  graphic.beginPath();
  graphic.translate(this.x, this.y);
  graphic.rotate(this.rotation);
  graphic.fillStyle = "#FFFFFF";
  graphic.moveTo(10, 0);
  graphic.lineTo(-7, 7);
  graphic.lineTo(-4, 0);
  graphic.lineTo(-7, -7);
  graphic.lineTo(10, 0);
  graphic.fill();
  graphic.restore();
};