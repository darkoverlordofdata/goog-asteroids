goog.provide('asteroids.systems.MovementSystem');
goog.require('ash.tools.ListIteratingSystem');
goog.require('asteroids.nodes.MovementNode');


/**
 * @constructor
 * @extends {ash.tools.ListIteratingSystem}
 * @param {asteroids.GameConfig}
 */
asteroids.systems.MovementSystem = function(_at_config) {
  this.config = _at_config;
  this.updateNode = goog.bind(this.updateNode, this);
  asteroids.systems.MovementSystem.superClass_.constructor.call(this, asteroids.nodes.MovementNode, this.updateNode);
}
goog.inherits(asteroids.systems.MovementSystem, ash.tools.ListIteratingSystem);

/** @type {asteroids.GameConfig} */
asteroids.systems.MovementSystem.prototype.config = null;

/**
 * @param {ash.core.Node}
 * @param {number}
 */
asteroids.systems.MovementSystem.prototype.updateNode = function(node, time) {
  var motion, position, xDamp, yDamp;
  position = node.position;
  motion = node.motion;
  position.position.x += motion.velocity.x * time;
  position.position.y += motion.velocity.y * time;
  if (position.position.x < 0) {
    position.position.x += this.config.width;
  }
  if (position.position.x > this.config.width) {
    position.position.x -= this.config.width;
  }
  if (position.position.y < 0) {
    position.position.y += this.config.height;
  }
  if (position.position.y > this.config.height) {
    position.position.y -= this.config.height;
  }
  position.rotation += motion.angularVelocity * time;
  if (motion.damping > 0) {
    xDamp = Math.abs(Math.cos(position.rotation) * motion.damping * time);
    yDamp = Math.abs(Math.sin(position.rotation) * motion.damping * time);
    if (motion.velocity.x > xDamp) {
      motion.velocity.x -= xDamp;
    } else if (motion.velocity.x < -xDamp) {
      motion.velocity.x += xDamp;
    } else {
      motion.velocity.x = 0;
    }
    if (motion.velocity.y > yDamp) {
      motion.velocity.y -= yDamp;
    } else if (motion.velocity.y < -yDamp) {
      motion.velocity.y += yDamp;
    } else {
      motion.velocity.y = 0;
    }
  }
};