goog.provide('asteroids.graphics.WaitForStartView');

goog.require('ash.signals.Signal0');


/**
 * @constructor
 * @param {CanvasRenderingContext2D}
 */
asteroids.graphics.WaitForStartView = function(_at_graphic) {
  this.graphic = _at_graphic;
  this.click = new ash.signals.Signal0();
  this.gameOver = this.createGameOver;
  this.instructions = this.createInstructions;
  this.clickToStart = this.createClickToStart;
  this.graphic.canvas.addEventListener('click', (function(_this) {
    return function(event) {
      return _this.click.dispatch();
    };
  })(this));
}

/** @type {number} */
asteroids.graphics.WaitForStartView.prototype.x = 0;

/** @type {number} */
asteroids.graphics.WaitForStartView.prototype.y = 0;

/** @type {number} */
asteroids.graphics.WaitForStartView.prototype.width = 4;

/** @type {number} */
asteroids.graphics.WaitForStartView.prototype.height = 4;

/** @type {number} */
asteroids.graphics.WaitForStartView.prototype.rotation = 0;

/** @type {CanvasRenderingContext2D} */
asteroids.graphics.WaitForStartView.prototype.graphic = null;

/** @type {Function} */
asteroids.graphics.WaitForStartView.prototype.gameOver = null;

/** @type {Function} */
asteroids.graphics.WaitForStartView.prototype.clickToStart = null;

/** @type {Function} */
asteroids.graphics.WaitForStartView.prototype.instructions = null;

/** @type {ash.signals.Signal0} */
asteroids.graphics.WaitForStartView.prototype.click = null;

/**
 * draw the game over button
 */
asteroids.graphics.WaitForStartView.prototype.createGameOver = function() {
  var l, s, x, y;
  this.graphic.save();
  this.graphic.beginPath();
  this.graphic.font = 'bold 32px Helvetica';
  this.graphic.fillStyle = '#FFFFFF';
  s = 'ASTEROIDS';
  l = this.graphic.measureText(s);
  x = Math.floor(((window.innerWidth * window.devicePixelRatio) - l.width) / 2);
  y = 175;
  this.graphic.fillText(s, x, y);
  this.graphic.fill();
  this.graphic.restore();
};

/**
 * draw the start button
 */
asteroids.graphics.WaitForStartView.prototype.createClickToStart = function() {
  var l, s, x, y;
  this.graphic.save();
  this.graphic.beginPath();
  this.graphic.font = 'bold 18px Helvetica';
  this.graphic.fillStyle = '#FFFFFF';
  s = 'CLICK TO START';
  l = this.graphic.measureText(s);
  x = Math.floor(((window.innerWidth * window.devicePixelRatio) - l.width) / 2);
  y = 225;
  this.graphic.fillText(s, x, y);
  this.graphic.fill();
  this.graphic.restore();
};

/**
 * draw the instructions
 */
asteroids.graphics.WaitForStartView.prototype.createInstructions = function() {
  var l, s, x, y;
  this.graphic.save();
  this.graphic.beginPath();
  this.graphic.font = 'bold 14px Helvetica';
  this.graphic.fillStyle = '#FFFFFF';
  s = 'CTRL-Z to Fire  ~  Arrow Keys to Move';
  l = this.graphic.measureText(s);
  x = 10;
  y = window.innerHeight * window.devicePixelRatio - 20;
  this.graphic.fillText(s, x, y);
  this.graphic.fill();
  this.graphic.restore();
};

/**
 * draw the view
 */
asteroids.graphics.WaitForStartView.prototype.draw = function() {
  this.gameOver();
  this.clickToStart();
  this.instructions();
};