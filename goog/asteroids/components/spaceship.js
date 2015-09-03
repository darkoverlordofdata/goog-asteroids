goog.provide('asteroids.components.Spaceship');

/**
 * @constructor
 * @param {ash.fsm.EntityStateMachine}
 */
asteroids.components.Spaceship = function(_at_fsm) {
  this.fsm = _at_fsm;
}

/** @type {string} */
asteroids.components.Spaceship.className = 'Spaceship';

/** @type {ash.fsm.EntityStateMachine} */
asteroids.components.Spaceship.prototype.fsm = null;