'use strict'

###
  * @constructor
###
class asteroids.nodes.MovementNode extends ash.core.Node

  ###* @type {string} ###
  @className: 'MovementNode'

  ###* @type {Object.<string, Function} ###
  @components:
    position : asteroids.components.Position
    motion : asteroids.components.Motion


  ###* @type {asteroids.components.Position} ###
  position : null
  ###* @type {asteroids.components.Motion} ###
  motion : null
