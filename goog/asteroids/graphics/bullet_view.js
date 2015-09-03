goog.provide('asteroids.graphics.BulletView');

/**
 * @constructor
 * @param {CanvasRenderingContext2D}
 */
asteroids.graphics.BulletView = function(_at_graphic) {
  this.graphic = _at_graphic;
}

/** @type {number} */
asteroids.graphics.BulletView.prototype.x = 0;

/** @type {number} */
asteroids.graphics.BulletView.prototype.y = 0;

/** @type {number} */
asteroids.graphics.BulletView.prototype.width = 4;

/** @type {number} */
asteroids.graphics.BulletView.prototype.height = 4;

/** @type {number} */
asteroids.graphics.BulletView.prototype.rotation = 0;

/** @type {CanvasRenderingContext2D} */
asteroids.graphics.BulletView.prototype.graphic = null;

/**
 * draw the view
 */
asteroids.graphics.BulletView.prototype.draw = function() {
  var graphic;
  graphic = this.graphic;
  graphic.save();
  graphic.beginPath();
  graphic.rotate(this.rotation);
  graphic.fillStyle = "#FFFFFF";
  graphic.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
  graphic.fill();
  graphic.restore();
};