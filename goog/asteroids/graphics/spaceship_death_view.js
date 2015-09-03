goog.provide('asteroids.graphics.SpaceshipDeathView');

goog.require('asteroids.ui.Point');


/**
 * @constructor
 * @param {CanvasRenderingContext2D}
 */
asteroids.graphics.SpaceshipDeathView = function(_at_graphic) {
  this.graphic = _at_graphic;
}

/** @type {number} */
asteroids.graphics.SpaceshipDeathView.prototype.x = 0;

/** @type {number} */
asteroids.graphics.SpaceshipDeathView.prototype.y = 0;

/** @type {number} */
asteroids.graphics.SpaceshipDeathView.prototype.width = 20;

/** @type {number} */
asteroids.graphics.SpaceshipDeathView.prototype.height = 20;

/** @type {number} */
asteroids.graphics.SpaceshipDeathView.prototype.rotation = 0;

/** @type {CanvasRenderingContext2D} */
asteroids.graphics.SpaceshipDeathView.prototype.graphic = null;

/** @type {asteroids.ui.Point} */
asteroids.graphics.SpaceshipDeathView.prototype.vel1 = null;

/** @type {asteroids.ui.Point} */
asteroids.graphics.SpaceshipDeathView.prototype.vel2 = null;

/** @type {number} */
asteroids.graphics.SpaceshipDeathView.prototype.rot1 = null;

/** @type {number} */
asteroids.graphics.SpaceshipDeathView.prototype.rot2 = null;

/** @type {number} */
asteroids.graphics.SpaceshipDeathView.prototype.x1 = 0;

/** @type {number} */
asteroids.graphics.SpaceshipDeathView.prototype.y2 = 0;

/** @type {number} */
asteroids.graphics.SpaceshipDeathView.prototype.y1 = 0;

/** @type {number} */
asteroids.graphics.SpaceshipDeathView.prototype.y2 = 0;

/** @type {boolean} */
asteroids.graphics.SpaceshipDeathView.prototype.first = true;

/**
 * @param {number}
 */
asteroids.graphics.SpaceshipDeathView.prototype.animate = function(time) {
  if (this.first) {
    this.first = false;
    this.vel1 = new asteroids.ui.Point(Math.random() * 10 - 5, Math.random() * 10 + 10);
    this.vel2 = new asteroids.ui.Point(Math.random() * 10 - 5, -(Math.random() * 10 + 10));
    this.rot1 = Math.random() * 300 - 150;
    this.rot2 = Math.random() * 300 - 150;
    this.x1 = this.x2 = this.x;
    this.y1 = this.y2 = this.y;
    this.r1 = this.r2 = this.rotation;
  }
  this.x1 += this.vel1.x * time;
  this.y1 += this.vel1.y * time;
  this.r1 += this.rot1 * time;
  this.x2 += this.vel2.x * time;
  this.y2 += this.vel2.y * time;
  this.r2 += this.rot2 * time;
  return this.draw();
};

/**
 * draw the view
 */
asteroids.graphics.SpaceshipDeathView.prototype.draw = function() {
  var graphic;
  graphic = this.graphic;
  graphic.save();
  graphic.beginPath();
  graphic.translate(this.x + this.x1, this.y + this.y1);
  graphic.rotate(this.r1);
  graphic.fillStyle = "#FFFFFF";
  graphic.moveTo(10, 0);
  graphic.lineTo(-7, 7);
  graphic.lineTo(-4, 0);
  graphic.lineTo(10, 0);
  graphic.fill();
  graphic.restore();
  graphic.save();
  graphic.beginPath();
  graphic.translate(this.x + this.x2, this.y + this.y2);
  graphic.rotate(this.r2);
  graphic.fillStyle = "#FFFFFF";
  graphic.moveTo(10, 0);
  graphic.lineTo(-7, 7);
  graphic.lineTo(-4, 0);
  graphic.lineTo(10, 0);
  graphic.fill();
  graphic.restore();
};