'use strict'

AnimationNode = asteroids.nodes.AnimationNode

class asteroids.systems.AnimationSystem extends ash.tools.ListIteratingSystem

  ###*
   * @constructor
  ###
  constructor: () ->

    super(AnimationNode, @updateNode)

  ###*
   * @param {ash.core.Node}
   * @param {number}
  ###
  updateNode: (node, time) =>

    node.animation.animation.animate(time)
    return # Void