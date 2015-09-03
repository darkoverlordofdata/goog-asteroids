goog.provide('asteroids.components.DeathThroes');

/**
 * @constructor
 * @param {number}
 */
asteroids.components.DeathThroes = function(duration) {
  this.countdown = duration;
}

/** @type {string} */
asteroids.components.DeathThroes.className = 'DeathThroes';

/** @type {number} */
asteroids.components.DeathThroes.prototype.countdown = 0;