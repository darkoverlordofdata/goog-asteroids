goog.provide('asteroids.systems.CollisionSystem');
goog.require('ash.core.System');
goog.require('asteroids.nodes.SpaceshipCollisionNode');
goog.require('asteroids.nodes.AsteroidCollisionNode');
goog.require('asteroids.nodes.BulletCollisionNode');
goog.require('asteroids.nodes.GameNode');
goog.require('asteroids.components.Animation');
goog.require('asteroids.components.Asteroid');
goog.require('asteroids.components.Audio');
goog.require('asteroids.components.Bullet');
goog.require('asteroids.components.Collision');
goog.require('asteroids.components.DeathThroes');
goog.require('asteroids.components.Display');
goog.require('asteroids.components.GameState');
goog.require('asteroids.components.Gun');
goog.require('asteroids.components.GunControls');
goog.require('asteroids.components.Hud');
goog.require('asteroids.components.Motion');
goog.require('asteroids.components.MotionControls');
goog.require('asteroids.components.Position');
goog.require('asteroids.components.Spaceship');
goog.require('asteroids.components.WaitForStart');
goog.require('asteroids.graphics.AsteroidDeathView');
goog.require('asteroids.graphics.AsteroidView');
goog.require('asteroids.graphics.BulletView');
goog.require('asteroids.graphics.HudView');
goog.require('asteroids.graphics.SpaceshipDeathView');
goog.require('asteroids.graphics.SpaceshipView');


/**
 * @constructor
 * @extends {ash.core.System}
 * @param {asteroids.EntityCreator}
 */
asteroids.systems.CollisionSystem = function(_at_creator) {
  this.creator = _at_creator;
  this.update = goog.bind(this.update, this);
}
goog.inherits(asteroids.systems.CollisionSystem, ash.core.System);

/** @type {asteroids.EntityCreator} */
asteroids.systems.CollisionSystem.prototype.creator = null;

/** @type {ash.core.NodeList} */
asteroids.systems.CollisionSystem.prototype.games = null;

/** @type {ash.core.NodeList} */
asteroids.systems.CollisionSystem.prototype.spaceships = null;

/** @type {ash.core.NodeList} */
asteroids.systems.CollisionSystem.prototype.asteroids = null;

/** @type {ash.core.NodeList} */
asteroids.systems.CollisionSystem.prototype.bullets = null;

/**
 * @param {ash.core.Engine}
 */
asteroids.systems.CollisionSystem.prototype.addToEngine = function(engine) {
  this.games = engine.getNodeList(asteroids.nodes.GameNode);
  this.spaceships = engine.getNodeList(asteroids.nodes.SpaceshipCollisionNode);
  this.asteroids = engine.getNodeList(asteroids.nodes.AsteroidCollisionNode);
  this.bullets = engine.getNodeList(asteroids.nodes.BulletCollisionNode);
};

/**
 * @param {ash.core.Engine}
 */
asteroids.systems.CollisionSystem.prototype.removeFromEngine = function(engine) {
  this.games = null;
  this.spaceships = null;
  this.asteroids = null;
  this.bullets = null;
};

/**
 * @param {number}
 */
asteroids.systems.CollisionSystem.prototype.update = function(time) {
  var asteroid, bullet, spaceship;
  bullet = this.bullets.head;
  while (bullet) {
    asteroid = this.asteroids.head;
    while (asteroid) {
      if (asteroid.position.position.distanceTo(bullet.position.position) <= asteroid.collision.radius) {
        
/*
         You hit an asteroid
         */
        this.creator.destroyEntity(bullet.entity);
        if (asteroid.collision.radius > 10) {
          this.creator.createAsteroid(asteroid.collision.radius - 10, asteroid.position.position.x + Math.random() * 10 - 5, asteroid.position.position.y + Math.random() * 10 - 5);
          this.creator.createAsteroid(asteroid.collision.radius - 10, asteroid.position.position.x + Math.random() * 10 - 5, asteroid.position.position.y + Math.random() * 10 - 5);
        }
        asteroid.asteroid.fsm.changeState('destroyed');
        if (this.games.head) {
          this.games.head.state.hits++;
        }
        break;
      }
      asteroid = asteroid.next;
    }
    bullet = bullet.next;
  }
  spaceship = this.spaceships.head;
  while (spaceship) {
    asteroid = this.asteroids.head;
    while (asteroid) {
      if (asteroid.position.position.distanceTo(spaceship.position.position) <= asteroid.collision.radius + spaceship.collision.radius) {
        
/*
         You were hit
         */
        spaceship.spaceship.fsm.changeState('destroyed');
        if (this.games.head) {
          this.games.head.state.lives++;
        }
        break;
      }
      asteroid = asteroid.next;
    }
    spaceship = spaceship.next;
  }
};