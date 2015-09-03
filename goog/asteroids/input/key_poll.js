goog.provide('asteroids.input.KeyPoll');

/**
 * @constructor
 * @param {Window} window
 */
asteroids.input.KeyPoll = function(_at_displayObj) {
  this.displayObj = _at_displayObj;
  this.isUp = goog.bind(this.isUp, this);
  this.isDown = goog.bind(this.isDown, this);
  this.keyUpListener = goog.bind(this.keyUpListener, this);
  this.keyDownListener = goog.bind(this.keyDownListener, this);
  this.states = {};
  this.displayObj.addEventListener("keydown", this.keyDownListener);
  this.displayObj.addEventListener("keyup", this.keyUpListener);
}

/** @type {Object.<string, boolean>} */
asteroids.input.KeyPoll.prototype.states = null;

/** @type Window} */
asteroids.input.KeyPoll.prototype.displayObj = null;

/**
 * @private
 * @param {KeyboardEvent}
 */
asteroids.input.KeyPoll.prototype.keyDownListener = function(event) {
  this.states[event.keyCode] = true;
};

/**
 * @private
 * @param {KeyboardEvent}
 */
asteroids.input.KeyPoll.prototype.keyUpListener = function(event) {
  if (this.states[event.keyCode]) {
    this.states[event.keyCode] = false;
  }
};

/**
 * @param {string}
 * @return {boolean}
 */
asteroids.input.KeyPoll.prototype.isDown = function(keyCode) {
  return this.states[keyCode];
};

/**
 * @param {string}
 * @return {boolean}
 */
asteroids.input.KeyPoll.prototype.isUp = function(keyCode) {
  return !this.states[keyCode];
};