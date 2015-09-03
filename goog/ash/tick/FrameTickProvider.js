goog.provide('ash.tick.FrameTickProvider');
goog.require('ash.signals.Signal1');
/*
 * Uses the enter frame event to provide a frame tick where the frame duration is the time since the previous frame.
 * There is a maximum frame time parameter in the constructor that can be used to limit
 * the longest period a frame can be.
 */

/**
 * @extends {ash.signals.Signal1}
 * @constructor
 * @param {Object} displayObject
 * @param {number} maximumFrameTime
 */
ash.tick.FrameTickProvider = function(_at_displayObject, _at_maximumFrameTime) {
  this.displayObject = _at_displayObject;
  this.maximumFrameTime = _at_maximumFrameTime;
  this.dispatchTick = goog.bind(this.dispatchTick, this);
  ash.tick.FrameTickProvider.superClass_.constructor.apply(this, arguments);
  if (this.displayObject != null) {
    if (typeof this.displayObject['begin'] === 'function' && typeof this.displayObject['end'] === 'function') {
      this.showStats = true;
      this.begin = this.displayObject['begin'].bind(this.displayObject);
      this.end = this.displayObject['end'].bind(this.displayObject);
    }
  }
}
goog.inherits(ash.tick.FrameTickProvider, ash.signals.Signal1);

/**
 * @type {boolean}
 */
ash.tick.FrameTickProvider.prototype.showStats = false;

/**
 * @type {Function}
 */
ash.tick.FrameTickProvider.prototype.begin = null;

/**
 * @type {Function}
 */
ash.tick.FrameTickProvider.prototype.end = null;

/**
 * @type {Object}
 */
ash.tick.FrameTickProvider.prototype.displayObject = null;

/**
 * @type {number}
 */
ash.tick.FrameTickProvider.prototype.previousTime = 0;

/**
 * @type {number}
 */
ash.tick.FrameTickProvider.prototype.maximumFrameTime = 0;

/**
 * @type {boolean}
 */
ash.tick.FrameTickProvider.prototype.isPlaying = false;

/**
 * @type {Object}
 */
ash.tick.FrameTickProvider.prototype.request = null;

/**
 * Applies a time adjustement factor to the tick, so you can slow down or speed up the entire engine.
 * The update tick time is multiplied by this value, so a value of 1 will run the engine at the normal rate.
 * @type {number}
 */
ash.tick.FrameTickProvider.prototype.timeAdjustment = 1;

/**
 * Start
 */
ash.tick.FrameTickProvider.prototype.start = function() {
  this.request = requestAnimationFrame(this.dispatchTick);
  this.isPlaying = true;
};

/**
 * Stop
 */
ash.tick.FrameTickProvider.prototype.stop = function() {
  cancelRequestAnimationFrame(this.request);
  this.isPlaying = false;
};

/**
 * dispatchTick
 @param {number} timestamp
 */
ash.tick.FrameTickProvider.prototype.dispatchTick = function(timestamp) {
  var frameTime, temp;
  if (timestamp == null) {
    timestamp = Date.now();
  }
  if (this.showStats) {
    this.begin();
  }
  temp = this.previousTime || timestamp;
  this.previousTime = timestamp;
  frameTime = (timestamp - temp) * 0.001;
  this.dispatch(frameTime);
  requestAnimationFrame(this.dispatchTick);
  if (this.showStats) {
    this.end();
  }
};