goog.provide('asteroids.nodes.AudioNode');
goog.require('ash.core.Node');
goog.require('asteroids.components.Audio');
/*
  * @constructor
 */
asteroids.nodes.AudioNode = function() {
  return asteroids.nodes.AudioNode.superClass_.constructor.apply(this, arguments);
}
goog.inherits(asteroids.nodes.AudioNode, ash.core.Node);

/** @type {string} */
asteroids.nodes.AudioNode.className = 'AudioNode';

/** @type {Object.<string, Function} */
asteroids.nodes.AudioNode.components = {
  audio: asteroids.components.Audio
};

/** @type {asteroids.components.Audio} */
asteroids.nodes.AudioNode.prototype.audio = null;