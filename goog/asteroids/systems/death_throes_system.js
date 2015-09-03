goog.provide('asteroids.systems.DeathThroesSystem');
goog.require('ash.tools.ListIteratingSystem');
goog.require('asteroids.nodes.DeathThroesNode');


/**
 * @constructor
 * @extends {ash.tools.ListIteratingSystem}
 * @param {asteroids.EntityCreator}
 */
asteroids.systems.DeathThroesSystem = function(_at_creator) {
  this.creator = _at_creator;
  this.updateNode = goog.bind(this.updateNode, this);
  asteroids.systems.DeathThroesSystem.superClass_.constructor.call(this, asteroids.nodes.DeathThroesNode, this.updateNode);
}
goog.inherits(asteroids.systems.DeathThroesSystem, ash.tools.ListIteratingSystem);

/** @type {asteroids.EntityCreator} */
asteroids.systems.DeathThroesSystem.prototype.creator = null;

/**
 * @param {ash.core.Node}
 * @param {number}
 */
asteroids.systems.DeathThroesSystem.prototype.updateNode = function(node, time) {
  node.death.countdown -= time;
  if (node.death.countdown <= 0) {
    this.creator.destroyEntity(node.entity);
  }
};