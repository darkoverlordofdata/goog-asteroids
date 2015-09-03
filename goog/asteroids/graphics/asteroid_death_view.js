goog.provide('asteroids.graphics.AsteroidDeathView');

goog.require('asteroids.ui.Point');


/**
 * @constructor
 * @param {CanvasRenderingContext2D}
 * @param {number}
 */
asteroids.graphics.AsteroidDeathView = function(_at_graphic, _at_radius) {
  this.graphic = _at_graphic;
  this.radius = _at_radius;
  this.dots = [];
}

/** @const */
var  numDots;
numDots = 8;

/** @type {Array<Dot>} */
asteroids.graphics.AsteroidDeathView.prototype.dots = null;

/** @type {number} */
asteroids.graphics.AsteroidDeathView.prototype.x = 0;

/** @type {number} */
asteroids.graphics.AsteroidDeathView.prototype.y = 0;

/** @type {number} */
asteroids.graphics.AsteroidDeathView.prototype.width = 0;

/** @type {number} */
asteroids.graphics.AsteroidDeathView.prototype.height = 0;

/** @type {number} */
asteroids.graphics.AsteroidDeathView.prototype.rotation = 0;

/** @type {CanvasRenderingContext2D} */
asteroids.graphics.AsteroidDeathView.prototype.graphic = null;

/** @type {number} */
asteroids.graphics.AsteroidDeathView.prototype.radius = 0;

/** @type {asteroids.ui.Point} */
asteroids.graphics.AsteroidDeathView.prototype.points = null;

/** @type {number} */
asteroids.graphics.AsteroidDeathView.prototype.count = 0;

/** @type {boolean} */
asteroids.graphics.AsteroidDeathView.prototype.first = true;

/**
 * @param {number}
 */
asteroids.graphics.AsteroidDeathView.prototype.animate = function(time) {
  var dot, i, _i, _j, _len, _ref;
  if (this.first) {
    this.first = false;
    for (i = _i = 0; 0 <= numDots ? _i < numDots : _i > numDots; i = 0 <= numDots ? ++_i : --_i) {
      dot = new Dot(this.graphic, this.radius);
      this.dots.push(dot);
    }
  }
  _ref = this.dots;
  for (_j = 0, _len = _ref.length; _j < _len; _j++) {
    dot = _ref[_j];
    dot.x += dot.velocity.x * time;
    dot.y += dot.velocity.y * time;
  }
  return this.draw();
};

/**
 * draw the view
 */
asteroids.graphics.AsteroidDeathView.prototype.draw = function() {
  var dot, _i, _len, _ref, _results;
  _ref = this.dots;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    dot = _ref[_i];
    _results.push(dot.draw(this.x, this.y));
  }
  return _results;
};

/**
* @constructor
* @param {CanvasRenderingContext2D}
* @param {number}
 */
var Dot = function(_at_graphic, maxDistance) {
  var angle, distance, speed;
  this.graphic = _at_graphic;
  angle = Math.random() * 2 * Math.PI;
  distance = Math.random() * maxDistance;
  this.x = Math.cos(angle) * distance;
  this.y = Math.sin(angle) * distance;
  speed = Math.random() * 10 + 10;
  this.velocity = new asteroids.ui.Point(Math.cos(angle) * speed, Math.sin(angle) * speed);
}

/** @type {asteroids.ui.Point} */
Dot.prototype.velocity = null;

/** @type {CanvasRenderingContext2D} */
Dot.prototype.graphic = null;

/** @type {number} */
Dot.prototype.x1 = 0;

/** @type {number} */
Dot.prototype.y1 = 0;

/** @type {number} */
Dot.prototype.x = 0;

/** @type {number} */
Dot.prototype.y = 0;

/**
* @param {number}
* @param {number}
 */
Dot.prototype.draw = function(x, y) {
  var graphic;
  graphic = this.graphic;
  graphic.save();
  graphic.beginPath();
  graphic.translate(x, y);
  graphic.rotate(this.rotation);
  graphic.fillStyle = "#FFFFFF";
  graphic.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
  graphic.fill();
  graphic.restore();
};