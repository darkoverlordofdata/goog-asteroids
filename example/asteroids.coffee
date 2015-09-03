#+--------------------------------------------------------------------+
#| asteroids.coffee
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
# Asteroids
#
'use strict'
AnimationSystem       = asteroids.systems.AnimationSystem
AudioSystem           = asteroids.systems.AudioSystem
BulletAgeSystem       = asteroids.systems.BulletAgeSystem
CollisionSystem       = asteroids.systems.CollisionSystem
DeathThroesSystem     = asteroids.systems.DeathThroesSystem
GameManager           = asteroids.systems.GameManager
GunControlSystem      = asteroids.systems.GunControlSystem
HudSystem             = asteroids.systems.HudSystem
MotionControlSystem   = asteroids.systems.MotionControlSystem
MovementSystem        = asteroids.systems.MovementSystem
RenderSystem          = asteroids.systems.RenderSystem
SystemPriorities      = asteroids.systems.SystemPriorities
WaitForStartSystem    = asteroids.systems.WaitForStartSystem
GameState             = asteroids.components.GameState
EntityCreator         = asteroids.EntityCreator
GameConfig            = asteroids.GameConfig
KeyPoll               = asteroids.input.KeyPoll
Engine                = ash.core.Engine
FrameTickProvider     = ash.tick.FrameTickProvider

class asteroids.Asteroids

  ###* @type {CanvasRenderingContext2D} 2D Canvas ###
  container: null
   
  ###* @type {ash.core.Engine} Engine ###
  engine: null
  
  ###* @type {ash.tick.FrameTickProvider} ###
  tickProvider: null
  
  ###* @type {asteroids.EntityCreator} ###
  creator: null
  
  ###* @type {asteroids.input.KeyPoll} ###
  keyPoll: null
  
  ###* @type {asteroids.GameConfig} ###
  config: null

  ###*
   * @constructor
   * @param {CanvasRenderingContext2D} 2D Canvas
   * @param {number} width
   * @param {number} height
  ###
  constructor: (@container, width, height) ->

    @prepare(width, height)

  ###*
   * 
   * @param {number} width
   * @param {number} height
  ###
  prepare: (width, height) ->

    @engine = new Engine()
    @creator = new EntityCreator(@engine, @container, @world)
    @keyPoll = new KeyPoll(window)
    @config = new GameConfig()
    @config.height = height
    @config.width = width

    @engine.addSystem(new WaitForStartSystem(@creator), SystemPriorities.preUpdate );
    @engine.addSystem(new GameManager(@creator, @config), SystemPriorities.preUpdate)
    @engine.addSystem(new MotionControlSystem(@keyPoll), SystemPriorities.update)
    @engine.addSystem(new GunControlSystem(@keyPoll, @creator), SystemPriorities.update)
    @engine.addSystem(new BulletAgeSystem(@creator), SystemPriorities.update)
    @engine.addSystem(new DeathThroesSystem(@creator), SystemPriorities.update)
    @engine.addSystem(new MovementSystem(@config), SystemPriorities.move)
    @engine.addSystem(new CollisionSystem(@creator), SystemPriorities.resolveCollisions)
    @engine.addSystem(new AnimationSystem(), SystemPriorities.animate);
    @engine.addSystem(new HudSystem(), SystemPriorities.animate);
    @engine.addSystem(new RenderSystem(@container), SystemPriorities.render)
    @engine.addSystem(new AudioSystem(), SystemPriorities.render);

    @creator.createWaitForClick()
    @creator.createGame()
    return

  ###*
  * Start the game play
  ###
  start: ->

    if navigator.isCocoonJS
      stats = null
    else
      x = Math.floor(@config.width/2)-40
      y = 0
      stats = new window['Stats']()
      stats['setMode'] 0
      stats['domElement'].style.position = "absolute"
      stats['domElement'].style.left = "#{x}px"
      stats['domElement'].style.top = "#{y}px"
      document.body.appendChild stats['domElement']

    @tickProvider = new FrameTickProvider(stats)
    @tickProvider.add(@engine.update)
    @tickProvider.start()
    return

