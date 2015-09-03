goog.provide('asteroids.nodes.DeathThroesNode');
goog.require('ash.core.Node');
goog.require('asteroids.components.DeathThroes');
/*
  * @constructor
 */
asteroids.nodes.DeathThroesNode = function() {
  return asteroids.nodes.DeathThroesNode.superClass_.constructor.apply(this, arguments);
}
goog.inherits(asteroids.nodes.DeathThroesNode, ash.core.Node);

/** @type {string} */
asteroids.nodes.DeathThroesNode.className = 'DeathThroesNode';

/** @type {Object.<string, Function} */
asteroids.nodes.DeathThroesNode.components = {
  death: asteroids.components.DeathThroes
};

/** @type {asteroids.components.DeathThroes} */
asteroids.nodes.DeathThroesNode.prototype.death = null;