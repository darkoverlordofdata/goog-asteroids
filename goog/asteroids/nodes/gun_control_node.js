goog.provide('asteroids.nodes.GunControlNode');
goog.require('ash.core.Node');
goog.require('asteroids.components.Audio');
goog.require('asteroids.components.GunControls');
goog.require('asteroids.components.Gun');
goog.require('asteroids.components.Position');
/*
  * @constructor
 */
asteroids.nodes.GunControlNode = function() {
  return asteroids.nodes.GunControlNode.superClass_.constructor.apply(this, arguments);
}
goog.inherits(asteroids.nodes.GunControlNode, ash.core.Node);

/** @type {string} */
asteroids.nodes.GunControlNode.className = 'GunControlNode';

/** @type {Object.<string, Function} */
asteroids.nodes.GunControlNode.components = {
  audio: asteroids.components.Audio,
  control: asteroids.components.GunControls,
  gun: asteroids.components.Gun,
  position: asteroids.components.Position
};

/** @type {asteroids.components.Audio} */
asteroids.nodes.GunControlNode.prototype.control = null;

/** @type {asteroids.components.GunControls} */
asteroids.nodes.GunControlNode.prototype.gun = null;

/** @type {asteroids.components.Gun} */
asteroids.nodes.GunControlNode.prototype.position = null;

/** @type {asteroids.components.Position} */
asteroids.nodes.GunControlNode.prototype.audio = null;