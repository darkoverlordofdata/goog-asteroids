goog.provide('asteroids.systems.HudSystem');
goog.require('ash.tools.ListIteratingSystem');
goog.require('asteroids.nodes.HudNode');


/**
 * @constructor
 * @extends {ash.tools.ListIteratingSystem}
 */
asteroids.systems.HudSystem = function() {
  this.updateNode = goog.bind(this.updateNode, this);
  asteroids.systems.HudSystem.superClass_.constructor.call(this, asteroids.nodes.HudNode, this.updateNode);
}
goog.inherits(asteroids.systems.HudSystem, ash.tools.ListIteratingSystem);

/**
 * @param {ash.core.Node}
 * @param {number}
 */
asteroids.systems.HudSystem.prototype.updateNode = function(node, time) {
  node.hud.view.setLives(node.state.lives);
  node.hud.view.setScore(node.state.hits);
};