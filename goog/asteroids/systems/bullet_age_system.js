goog.provide('asteroids.systems.BulletAgeSystem');
goog.require('ash.tools.ListIteratingSystem');
goog.require('asteroids.nodes.BulletAgeNode');


/**
 * @constructor
 * @param {asteroids.EntityCreator}
 */
asteroids.systems.BulletAgeSystem = function(_at_creator) {
  this.creator = _at_creator;
  this.updateNode = goog.bind(this.updateNode, this);
  asteroids.systems.BulletAgeSystem.superClass_.constructor.call(this, asteroids.nodes.BulletAgeNode, this.updateNode);
}
goog.inherits(asteroids.systems.BulletAgeSystem, ash.tools.ListIteratingSystem);

/** @type {asteroids.EntityCreator} */
asteroids.systems.BulletAgeSystem.prototype.creator = null;

/**
 * @param {ash.core.Node}
 * @param {number}
 */
asteroids.systems.BulletAgeSystem.prototype.updateNode = function(node, time) {
  var bullet;
  bullet = node.bullet;
  bullet.lifeRemaining -= time;
  if (bullet.lifeRemaining <= 0) {
    this.creator.destroyEntity(node.entity);
  }
};