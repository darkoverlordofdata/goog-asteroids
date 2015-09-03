goog.provide('asteroids.graphics.HudView');

/**
 * @constructor
 * @param {CanvasRenderingContext2D}
 */
asteroids.graphics.HudView = function(_at_graphic) {
  this.graphic = _at_graphic;
  this.setScore = goog.bind(this.setScore, this);
  this.setLives = goog.bind(this.setLives, this);
  this.draw = goog.bind(this.draw, this);
  this.drawScore = this.createScore;
  this.drawLives = this.createLives;
}

/** @type {number} */
asteroids.graphics.HudView.prototype.x = 0;

/** @type {number} */
asteroids.graphics.HudView.prototype.y = 0;

/** @type {number} */
asteroids.graphics.HudView.prototype.width = 4;

/** @type {number} */
asteroids.graphics.HudView.prototype.height = 4;

/** @type {number} */
asteroids.graphics.HudView.prototype.rotation = 0;

/** @type {CanvasRenderingContext2D} */
asteroids.graphics.HudView.prototype.graphic = null;

/** @type {number} */
asteroids.graphics.HudView.prototype.score = 0;

/** @type {number} */
asteroids.graphics.HudView.prototype.lives = 3;

/** @type {Function} */
asteroids.graphics.HudView.prototype.drawScore = null;

/** @type {Function} */
asteroids.graphics.HudView.prototype.drawLives = null;

/**
 * draw the view
 */
asteroids.graphics.HudView.prototype.draw = function() {
  this.drawScore();
  this.drawLives();
};

/**
 * @param {number}
 */
asteroids.graphics.HudView.prototype.setLives = function(lives) {
  return this.lives = lives;
};

/**
 * @param {number}
 */
asteroids.graphics.HudView.prototype.setScore = function(score) {
  return this.score = score;
};

/**
 * draw the lives display
 */
asteroids.graphics.HudView.prototype.createLives = function() {
  var l, s, x, y;
  this.graphic.save();
  this.graphic.beginPath();
  this.graphic.font = 'bold 18px Helvetica';
  this.graphic.fillStyle = '#FFFFFF';
  this.graphic.textAlign = 'center';
  s = "LIVES: " + this.lives;
  l = this.graphic.measureText(s);
  x = l.width;
  y = 20;
  this.graphic.fillText(s, x, y);
  this.graphic.fill();
  this.graphic.restore();
};

/**
 * draw the score display
 */
asteroids.graphics.HudView.prototype.createScore = function() {
  var l, s, x, y;
  this.graphic.save();
  this.graphic.beginPath();
  this.graphic.font = 'bold 18px Helvetica';
  this.graphic.fillStyle = '#FFFFFF';
  this.graphic.textAlign = 'center';
  s = "SCORE: " + this.score;
  l = this.graphic.measureText(s);
  x = (window.window.innerWidth * window.devicePixelRatio) - l.width;
  y = 20;
  this.graphic.fillText(s, x, y);
  this.graphic.fill();
  this.graphic.restore();
};