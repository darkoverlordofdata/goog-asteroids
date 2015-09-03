'use strict'

BulletAgeNode = asteroids.nodes.BulletAgeNode

class asteroids.systems.BulletAgeSystem extends ash.tools.ListIteratingSystem

  ###* @type {asteroids.EntityCreator} ###
  creator: null

  ###*
   * @constructor
   * @param {asteroids.EntityCreator}
  ###
  constructor: (@creator) ->

    super(BulletAgeNode, @updateNode)

  ###*
   * @param {ash.core.Node}
   * @param {number}
  ###
  updateNode: (node, time) =>

    bullet = node.bullet
    bullet.lifeRemaining -= time
    if bullet.lifeRemaining <= 0
      @creator.destroyEntity node.entity
    return # Void

