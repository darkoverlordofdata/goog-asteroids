goog.provide('asteroids.systems.AudioSystem');
goog.require('ash.tools.ListIteratingSystem');
goog.require('asteroids.nodes.AudioNode');


/**
 * @constructor
 */
asteroids.systems.AudioSystem = function() {
  this.updateNode = goog.bind(this.updateNode, this);
  asteroids.systems.AudioSystem.superClass_.constructor.call(this, asteroids.nodes.AudioNode, this.updateNode);
}
goog.inherits(asteroids.systems.AudioSystem, ash.tools.ListIteratingSystem);

/**
 * @param {ash.core.Node}
 * @param {number}
 */
asteroids.systems.AudioSystem.prototype.updateNode = function(node, time) {
  var each, sound, type, _ref;
  _ref = node.audio.toPlay;
  for (each in _ref) {
    type = _ref[each];
    sound = new type();
    sound.play(0, 1);
  }
  node.audio.toPlay.length = 0;
};