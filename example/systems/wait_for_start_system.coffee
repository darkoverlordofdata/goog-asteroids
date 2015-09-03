'use strict'

WaitForStartNode        = asteroids.nodes.WaitForStartNode
AsteroidCollisionNode   = asteroids.nodes.AsteroidCollisionNode
GameNode                = asteroids.nodes.GameNode

class asteroids.systems.WaitForStartSystem extends ash.core.System

  ###* @type {ash.core.Engine} ###
  engine: null
  
  ###* @type {asteroids.EntityCreator} ###
  creator: null
  
  ###* @type {ash.core.NodeList} ###
  gameNodes: null
  
  ###* @type {ash.core.NodeList} ###
  waitNodes: null
  
  ###* @type {ash.core.NodeList} ###
  asteroids: null

  ###*
   * @constructor
   * @extends {ash.tools.ListIteratingSystem}
   * @param {asteroids.EntityCreator}
  ###
  constructor: (@creator) ->

  ###*
   * @param {ash.core.Engine}
  ###
  addToEngine: (engine) ->
    @engine = engine
    @waitNodes = engine.getNodeList(WaitForStartNode)
    @gameNodes = engine.getNodeList(GameNode)
    @asteroids = engine.getNodeList(AsteroidCollisionNode)
    return # Void

  ###*
   * @param {ash.core.Engine}
  ###
  removeFromEngine: (engine) ->
    @waitNodes = null
    @gameNodes = null
    return # Void

  ###*
   * @param {number}
  ###
  update: (time) =>
    node = @waitNodes.head
    game = @gameNodes.head

    if (node and node.wait.startGame and game)
      asteroid = @asteroids.head
      while asteroid
        @creator.destroyEntity(asteroid.entity)
        asteroid = asteroid.next

      game.state.setForStart()
      node.wait.startGame = false
      @engine.removeEntity(node.entity)
    return # Void
