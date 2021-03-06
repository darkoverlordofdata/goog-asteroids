#+--------------------------------------------------------------------+
#| entity_creator.coffee
#+--------------------------------------------------------------------+
#| Copyright DarkOverlordOfData (c) 2015
#+--------------------------------------------------------------------+
#|
#| This file is a part of ash.coffee
#|
#| ash.coffee is free software; you can copy, modify, and distribute
#| it under the terms of the MIT License
#|
#+--------------------------------------------------------------------+
#
# EntityCreator
#
'use strict'
WaitForStartView      = asteroids.graphics.WaitForStartView
Entity                = ash.core.Entity
EntityStateMachine    = ash.fsm.EntityStateMachine
Animation             = asteroids.components.Animation
Asteroid              = asteroids.components.Asteroid
Audio                 = asteroids.components.Audio
Bullet                = asteroids.components.Bullet
Collision             = asteroids.components.Collision
DeathThroes           = asteroids.components.DeathThroes
Display               = asteroids.components.Display
GameState             = asteroids.components.GameState
Gun                   = asteroids.components.Gun
GunControls           = asteroids.components.GunControls
Hud                   = asteroids.components.Hud
Motion                = asteroids.components.Motion
MotionControls        = asteroids.components.MotionControls
Position              = asteroids.components.Position
Spaceship             = asteroids.components.Spaceship
WaitForStart          = asteroids.components.WaitForStart
AsteroidDeathView     = asteroids.graphics.AsteroidDeathView
AsteroidView          = asteroids.graphics.AsteroidView
BulletView            = asteroids.graphics.BulletView
HudView               = asteroids.graphics.HudView
SpaceshipDeathView    = asteroids.graphics.SpaceshipDeathView
SpaceshipView         = asteroids.graphics.SpaceshipView

class asteroids.EntityCreator


  ###* @const ###
  KEY_LEFT = 37
  ###* @const ###
  KEY_UP = 38
  ###* @const ###
  KEY_RIGHT = 39
  ###* @const ###
  KEY_Z = 90

  ###* @type {ash.core.Engine} Engine ###
  engine: null
  
  ###* @type {asteroids.graphics.WaitForStartView} ###
  waitEntity: null
  
  ###* @type {CanvasRenderingContext2D} ###
  graphic: null

  ###*
   * @constructor
   * @param {ash.core.Engine} 
   * @param {CanvasRenderingContext2D} 
   * @param {Object} b2World (undefined)
  ###
  constructor: (@engine, @graphic, @world) ->

  ###*
   * @param {ash.core.Entity} entity to destroy
  ###
  destroyEntity: (entity) ->
    @engine.removeEntity entity
    return

  ###*
   * create game
   * @return {ash.core.Entity}
  ###
  createGame: () ->
    hud = new HudView(@graphic)
    gameEntity = new Entity('game')
    .add(new GameState())
    .add(new Hud(hud))
    .add(new Display(hud))
    .add(new Position(0, 0, 0, 0))
    @engine.addEntity gameEntity
    return gameEntity

  ###*
   * Create the Start Button
   * @return {ash.core.Entity}
  ###
  createWaitForClick: () ->
    if not @waitEntity
      waitView = new WaitForStartView(@graphic)
      @waitEntity = new Entity('wait')
      .add(new WaitForStart(waitView))
      .add(new Display(waitView))
      .add(new Position(0, 0, 0, 0))

    @waitEntity.get(WaitForStart).startGame = false
    @engine.addEntity(@waitEntity)
    return @waitEntity

  ###*
   * Create an Asteroid with FSM Animation
   * @param {number} radius
   * @param {number} x
   * @param {number} y
   * @return {ash.core.Entity}
  ###
  createAsteroid: (radius, x, y) ->

    asteroid = new Entity()
    fsm = new EntityStateMachine(asteroid)

    fsm.createState('alive')
    .add(Motion).withInstance(new Motion((Math.random() - 0.5) * 4 * (50 - radius), (Math.random() - 0.5) * 4 * (50 - radius), Math.random() * 2 - 1, 0))
    .add(Collision).withInstance(new Collision(radius))
    .add(Display).withInstance(new Display(new AsteroidView(@graphic, radius)))

    deathView = new AsteroidDeathView(@graphic, radius)
    fsm.createState('destroyed')
    .add(DeathThroes).withInstance(new DeathThroes(3))
    .add(Display).withInstance(new Display(deathView))
    .add(Animation).withInstance(new Animation(deathView))

    asteroid
    .add(new Asteroid(fsm))
    .add(new Position(x, y, 0))
    .add(new Audio())

    fsm.changeState('alive')
    @engine.addEntity asteroid
    return asteroid

  ###*
   * Create Player Spaceship with FSM Animation
   * @return {ash.core.Entity}
  ###
  createSpaceship: ->

    spaceship = new Entity()
    fsm = new EntityStateMachine(spaceship)

    fsm.createState('playing')
    .add(Motion).withInstance(new Motion(0, 0, 0, 15))
    .add(MotionControls).withInstance(new MotionControls(KEY_LEFT, KEY_RIGHT, KEY_UP, 100, 3))
    .add(Gun).withInstance(new Gun(8, 0, 0.3, 2 ))
    .add(GunControls).withInstance(new GunControls(KEY_Z))
    .add(Collision).withInstance(new Collision(9))
    .add(Display).withInstance(new Display(new SpaceshipView(@graphic)))

    deathView = new SpaceshipDeathView(@graphic)
    fsm.createState('destroyed')
    .add(DeathThroes).withInstance(new DeathThroes(5))
    .add(Display).withInstance(new Display(deathView))
    .add(Animation).withInstance(new Animation(deathView))

    spaceship
    .add(new Spaceship(fsm))
    .add(new Position(300, 225, 0))
    .add(new Audio())

    fsm.changeState('playing')
    @engine.addEntity spaceship
    return spaceship


  ###*
   * Create a Bullet
   * @param {asteroids.components.Gun}
   * @param {asteroids.components.Position}
   * @return {ash.core.Entity}
  ###
  createUserBullet: (gun, parentPosition) ->

    cos = Math.cos(parentPosition.rotation)
    sin = Math.sin(parentPosition.rotation)

    x = cos * gun.offsetFromParent.x - sin * gun.offsetFromParent.y + parentPosition.position.x
    y = sin * gun.offsetFromParent.x + cos * gun.offsetFromParent.y + parentPosition.position.y

    bullet = new Entity()
    .add(new Bullet(gun.bulletLifetime))
    .add(new Position(x, y, 0))
    .add(new Collision(0))
    .add(new Motion(cos * 150, sin * 150, 0, 0))
    .add(new Display(new BulletView(@graphic)))
    @engine.addEntity(bullet)
    return bullet


