goog.provide('asteroids.components.GameState');

asteroids.components.GameState = function() {}

/** @type {string} */
asteroids.components.GameState.className = 'GameState';

/** @type {number} */
asteroids.components.GameState.prototype.lives = 3;

/** @type {number} */
asteroids.components.GameState.prototype.level = 0;

/** @type {number} */
asteroids.components.GameState.prototype.hits = 0;

/** @type {boolean} */
asteroids.components.GameState.prototype.playing = false;

/**
 * @constructor
 */
asteroids.components.GameState.prototype.setForStart = function() {
  this.lives = 3;
  this.level = 0;
  this.hits = 0;
  this.playing = true;
};