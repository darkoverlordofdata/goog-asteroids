goog.provide('asteroids.components.WaitForStart');

/**
 * @constructor
 * @param {Object}
 */
asteroids.components.WaitForStart = function(_at_waitForStart) {
  this.waitForStart = _at_waitForStart;
  this.setStartGame = goog.bind(this.setStartGame, this);
  this.waitForStart.click.add(this.setStartGame);
}

/** @type {string} */
asteroids.components.WaitForStart.className = 'WaitForStart';

/** @type {Object} */
asteroids.components.WaitForStart.prototype.waitForStart = null;

/** @type {boolean} */
asteroids.components.WaitForStart.prototype.startGame = false;

/**
 * Start game
 */
asteroids.components.WaitForStart.prototype.setStartGame = function() {
  this.startGame = true;
};