'use strict'

HudNode = asteroids.nodes.HudNode

class asteroids.systems.HudSystem extends ash.tools.ListIteratingSystem

  ###*
   * @constructor
   * @extends {ash.tools.ListIteratingSystem}
  ###
  constructor: () ->
    super(HudNode, @updateNode)

  ###*
   * @param {ash.core.Node}
   * @param {number}
  ###
  updateNode: (node, time) =>
    node.hud.view.setLives(node.state.lives)
    node.hud.view.setScore(node.state.hits)
    return # Void
