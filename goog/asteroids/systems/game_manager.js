goog.provide('asteroids.systems.GameManager');
goog.require('ash.core.System');
goog.require('asteroids.nodes.GameNode');
goog.require('asteroids.nodes.SpaceshipNode');
goog.require('asteroids.nodes.AsteroidCollisionNode');
goog.require('asteroids.nodes.BulletCollisionNode');
goog.require('asteroids.ui.Point');


/**
 * @constructor
 * @extends {ash.core.System}
 * @param {asteroids.EntityCreator}
 * @param {asteroids.GameConfig}
 */
asteroids.systems.GameManager = function(_at_creator, _at_config) {
  this.creator = _at_creator;
  this.config = _at_config;
  this.update = goog.bind(this.update, this);
}
goog.inherits(asteroids.systems.GameManager, ash.core.System);

/** @type {asteroids.GameConfig} */
asteroids.systems.GameManager.prototype.config = null;

/** @type {asteroids.EntityCreator} */
asteroids.systems.GameManager.prototype.creator = null;

/** @type {ash.core.NodeList} */
asteroids.systems.GameManager.prototype.gameNodes = null;

/** @type {ash.core.NodeList} */
asteroids.systems.GameManager.prototype.spaceships = null;

/** @type {ash.core.NodeList} */
asteroids.systems.GameManager.prototype.asteroids = null;

/** @type {ash.core.NodeList} */
asteroids.systems.GameManager.prototype.bullets = null;

/**
 * @param {ash.core.Engine}
 */
asteroids.systems.GameManager.prototype.addToEngine = function(engine) {
  this.gameNodes = engine.getNodeList(asteroids.nodes.GameNode);
  this.spaceships = engine.getNodeList(asteroids.nodes.SpaceshipNode);
  this.asteroids = engine.getNodeList(asteroids.nodes.AsteroidCollisionNode);
  this.bullets = engine.getNodeList(asteroids.nodes.BulletCollisionNode);
};

/**
 * @param {number}
 */
asteroids.systems.GameManager.prototype.update = function(time) {
  var asteroid, asteroidCount, clearToAddSpaceship, i, newSpaceshipPosition, node, position, spaceship;
  node = this.gameNodes.head;
  if (node && node.state.playing) {
    if (this.spaceships.isEmpty()) {
      if (node.state.lives > 0) {
        newSpaceshipPosition = new asteroids.ui.Point(this.config.width * 0.5, this.config.height * 0.5);
        clearToAddSpaceship = true;
        asteroid = this.asteroids.head;
        while (asteroid) {
          if (asteroids.ui.Point.distance(asteroid.position.position, newSpaceshipPosition) <= asteroid.collision.radius + 50) {
            clearToAddSpaceship = false;
            break;
          }
          asteroid = asteroid.next;
        }
        if (clearToAddSpaceship) {
          this.creator.createSpaceship();
        }
      } else {
        node.state.playing = false;
        this.creator.createWaitForClick();
      }
    }
    if (this.asteroids.isEmpty() && this.bullets.isEmpty() && !this.spaceships.isEmpty()) {
      spaceship = this.spaceships.head;
      node.state.level++;
      asteroidCount = 2 + node.state.level;
      i = 0;
      while (i < asteroidCount) {
        while (true) {
          position = new asteroids.ui.Point(Math.random() * this.config.width, Math.random() * this.config.height);
          if (!(asteroids.ui.Point.distance(position, spaceship.position.position) <= 80)) {
            break;
          }
        }
        this.creator.createAsteroid(30, position.x, position.y);
        ++i;
      }
    }
  }
};

/**
 * @param {ash.core.Engine}
 */
asteroids.systems.GameManager.prototype.removeFromEngine = function(engine) {
  this.gameNodes = null;
  this.spaceships = null;
  this.asteroids = null;
  this.bullets = null;
};