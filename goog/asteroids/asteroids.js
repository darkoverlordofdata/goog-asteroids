goog.provide('asteroids.Asteroids');

goog.require('asteroids.systems.AnimationSystem');
goog.require('asteroids.systems.AudioSystem');
goog.require('asteroids.systems.BulletAgeSystem');
goog.require('asteroids.systems.CollisionSystem');
goog.require('asteroids.systems.DeathThroesSystem');
goog.require('asteroids.systems.GameManager');
goog.require('asteroids.systems.GunControlSystem');
goog.require('asteroids.systems.HudSystem');
goog.require('asteroids.systems.MotionControlSystem');
goog.require('asteroids.systems.MovementSystem');
goog.require('asteroids.systems.RenderSystem');
goog.require('asteroids.systems.SystemPriorities');
goog.require('asteroids.systems.WaitForStartSystem');
goog.require('asteroids.components.GameState');
goog.require('asteroids.EntityCreator');
goog.require('asteroids.GameConfig');
goog.require('asteroids.input.KeyPoll');
goog.require('ash.core.Engine');
goog.require('ash.tick.FrameTickProvider');


/**
 * @constructor
 * @param {CanvasRenderingContext2D} 2D Canvas
 * @param {number} width
 * @param {number} height
 */
asteroids.Asteroids = function(_at_container, width, height) {
  this.container = _at_container;
  this.prepare(width, height);
}

/** @type {CanvasRenderingContext2D} 2D Canvas */
asteroids.Asteroids.prototype.container = null;

/** @type {ash.core.Engine} Engine */
asteroids.Asteroids.prototype.engine = null;

/** @type {ash.tick.FrameTickProvider} */
asteroids.Asteroids.prototype.tickProvider = null;

/** @type {asteroids.EntityCreator} */
asteroids.Asteroids.prototype.creator = null;

/** @type {asteroids.input.KeyPoll} */
asteroids.Asteroids.prototype.keyPoll = null;

/** @type {asteroids.GameConfig} */
asteroids.Asteroids.prototype.config = null;

/**
 * 
 * @param {number} width
 * @param {number} height
 */
asteroids.Asteroids.prototype.prepare = function(width, height) {
  this.engine = new ash.core.Engine();
  this.creator = new asteroids.EntityCreator(this.engine, this.container, this.world);
  this.keyPoll = new asteroids.input.KeyPoll(window);
  this.config = new asteroids.GameConfig();
  this.config.height = height;
  this.config.width = width;
  this.engine.addSystem(new asteroids.systems.WaitForStartSystem(this.creator), asteroids.systems.SystemPriorities.preUpdate);
  this.engine.addSystem(new asteroids.systems.GameManager(this.creator, this.config), asteroids.systems.SystemPriorities.preUpdate);
  this.engine.addSystem(new asteroids.systems.MotionControlSystem(this.keyPoll), asteroids.systems.SystemPriorities.update);
  this.engine.addSystem(new asteroids.systems.GunControlSystem(this.keyPoll, this.creator), asteroids.systems.SystemPriorities.update);
  this.engine.addSystem(new asteroids.systems.BulletAgeSystem(this.creator), asteroids.systems.SystemPriorities.update);
  this.engine.addSystem(new asteroids.systems.DeathThroesSystem(this.creator), asteroids.systems.SystemPriorities.update);
  this.engine.addSystem(new asteroids.systems.MovementSystem(this.config), asteroids.systems.SystemPriorities.move);
  this.engine.addSystem(new asteroids.systems.CollisionSystem(this.creator), asteroids.systems.SystemPriorities.resolveCollisions);
  this.engine.addSystem(new asteroids.systems.AnimationSystem(), asteroids.systems.SystemPriorities.animate);
  this.engine.addSystem(new asteroids.systems.HudSystem(), asteroids.systems.SystemPriorities.animate);
  this.engine.addSystem(new asteroids.systems.RenderSystem(this.container), asteroids.systems.SystemPriorities.render);
  this.engine.addSystem(new asteroids.systems.AudioSystem(), asteroids.systems.SystemPriorities.render);
  this.creator.createWaitForClick();
  this.creator.createGame();
};

/**
* Start the game play
 */
asteroids.Asteroids.prototype.start = function() {
  var stats, x, y;
  if (navigator.isCocoonJS) {
    stats = null;
  } else {
    x = Math.floor(this.config.width / 2) - 40;
    y = 0;
    stats = new window['Stats']();
    stats['setMode'](0);
    stats['domElement'].style.position = "absolute";
    stats['domElement'].style.left = x + "px";
    stats['domElement'].style.top = y + "px";
    document.body.appendChild(stats['domElement']);
  }
  this.tickProvider = new ash.tick.FrameTickProvider(stats);
  this.tickProvider.add(this.engine.update);
  this.tickProvider.start();
};