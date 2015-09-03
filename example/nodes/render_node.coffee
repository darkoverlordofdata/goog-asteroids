'use strict'

###
  * @constructor
###
class asteroids.nodes.RenderNode extends ash.core.Node

  ###* @type {string} ###
  @className: 'RenderNode'

  ###* @type {Object.<string, Function} ###
  @components:
    position  : asteroids.components.Position
    display   : asteroids.components.Display

  ###* @type {asteroids.components.Position} ###
  position  : null
  ###* @type {asteroids.components.Display} ###
  display   : null
