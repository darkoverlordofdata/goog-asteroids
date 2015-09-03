goog.provide('asteroids.graphics.AsteroidView');

/**
 * @constructor
 * @param {CanvasRenderingContext2D}
 * @param {number}
 */
asteroids.graphics.AsteroidView = function(_at_graphic, _at_radius) {
  var angle, length, posX, posY;
  this.graphic = _at_graphic;
  this.radius = _at_radius;
  this.width = this.radius;
  this.height = this.radius;
  this.points = [];
  angle = 0;
  while (angle < Math.PI * 2) {
    length = (0.75 + Math.random() * 0.25) * this.radius;
    posX = Math.cos(angle) * length;
    posY = Math.sin(angle) * length;
    this.points.push({
      x: posX,
      y: posY
    });
    angle += Math.random() * 0.5;
  }
}

/** @type {number} */
asteroids.graphics.AsteroidView.prototype.x = 0;

/** @type {number} */
asteroids.graphics.AsteroidView.prototype.y = 0;

/** @type {number} */
asteroids.graphics.AsteroidView.prototype.width = 0;

/** @type {number} */
asteroids.graphics.AsteroidView.prototype.height = 0;

/** @type {number} */
asteroids.graphics.AsteroidView.prototype.rotation = 0;

/** @type {CanvasRenderingContext2D} */
asteroids.graphics.AsteroidView.prototype.graphic = null;

/** @type {number} */
asteroids.graphics.AsteroidView.prototype.radius = 0;

/** @type {Array<asteroids.ui.Point>} */
asteroids.graphics.AsteroidView.prototype.points = null;

/** @type {number} */
asteroids.graphics.AsteroidView.prototype.count = 0;

/**
 * draw the view
 */
asteroids.graphics.AsteroidView.prototype.draw = function() {
  var graphic, i;
  graphic = this.graphic;
  graphic.save();
  graphic.beginPath();
  graphic.translate(this.x, this.y);
  graphic.rotate(this.rotation);
  graphic.fillStyle = "#FFFFFF";
  graphic.moveTo(this.radius, 0);
  i = 0;
  while (i < this.points.length) {
    graphic.lineTo(this.points[i].x, this.points[i].y);
    ++i;
  }
  graphic.lineTo(this.radius, 0);
  graphic.fill();
  graphic.restore();
};