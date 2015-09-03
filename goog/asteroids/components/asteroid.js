goog.provide('asteroids.components.Asteroid');

/**
 * @constructor
 * @param {ash.fsm.EntityStateMachine}
 */
asteroids.components.Asteroid = function(_at_fsm) {
  this.fsm = _at_fsm;
}

/** @type {string} */
asteroids.components.Asteroid.className = 'Asteroid';

/** @type {ash.fsm.EntityStateMachine} */
asteroids.components.Asteroid.prototype.fsm = null;