goog.provide('asteroids.nodes.HudNode');
goog.require('ash.core.Node');
goog.require('asteroids.components.GameState');
goog.require('asteroids.components.Hud');
/*
  * @constructor
 */
asteroids.nodes.HudNode = function() {
  return asteroids.nodes.HudNode.superClass_.constructor.apply(this, arguments);
}
goog.inherits(asteroids.nodes.HudNode, ash.core.Node);

/** @type {string} */
asteroids.nodes.HudNode.className = 'HudNode';

/** @type {Object.<string, Function} */
asteroids.nodes.HudNode.components = {
  state: asteroids.components.GameState,
  hud: asteroids.components.Hud
};

/** @type {asteroids.components.GameState} */
asteroids.nodes.HudNode.prototype.state = null;

/** @type {asteroids.components.Hud} */
asteroids.nodes.HudNode.prototype.hud = null;