'use strict'

DeathThroesNode = asteroids.nodes.DeathThroesNode

class asteroids.systems.DeathThroesSystem extends ash.tools.ListIteratingSystem

  ###* @type {asteroids.EntityCreator} ###
  creator: null

  ###*
   * @constructor
   * @extends {ash.tools.ListIteratingSystem}
   * @param {asteroids.EntityCreator}
  ###
  constructor: (@creator) ->
    super(DeathThroesNode, @updateNode)

  ###*
   * @param {ash.core.Node}
   * @param {number}
  ###
  updateNode: (node, time) =>

    node.death.countdown -= time
    if (node.death.countdown <= 0)
      @creator.destroyEntity(node.entity)
    return # Void
