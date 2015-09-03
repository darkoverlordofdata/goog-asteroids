goog.provide('asteroids.components.Audio');

/**
 * @constructor
 */
asteroids.components.Audio = function() {
  this.toPlay = [];
}

/** @type {string} */
asteroids.components.Audio.className = 'Audio';

/** @type {Array<Object>} */
asteroids.components.Audio.prototype.toPlay = null;

/**
 * @param {Object}
 */
asteroids.components.Audio.prototype.play = function(sound) {
  return this.toPlay.push(sound);
};