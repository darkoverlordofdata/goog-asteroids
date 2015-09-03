'use strict'

###
  * @constructor
###
class asteroids.nodes.MotionControlNode extends ash.core.Node

  ###* @type {string} ###
  @className: 'MotionControlNode'

  ###* @type {Object.<string, Function} ###
  @components:
    control   : asteroids.components.MotionControls
    position  : asteroids.components.Position
    motion    : asteroids.components.Motion


  ###* @type {asteroids.components.MotionControls} ###
  control   : null
  ###* @type {asteroids.components.Position} ###
  position  : null
  ###* @type {asteroids.components.Motion} ###
  motion    : null
