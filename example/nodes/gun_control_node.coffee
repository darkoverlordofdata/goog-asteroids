'use strict'

###
  * @constructor
###
class asteroids.nodes.GunControlNode extends ash.core.Node

  ###* @type {string} ###
  @className: 'GunControlNode'

  ###* @type {Object.<string, Function} ###
  @components:
    audio     : asteroids.components.Audio
    control   : asteroids.components.GunControls
    gun       : asteroids.components.Gun
    position  : asteroids.components.Position

  ###* @type {asteroids.components.Audio} ###
  control   : null
  ###* @type {asteroids.components.GunControls} ###
  gun       : null
  ###* @type {asteroids.components.Gun} ###
  position  : null
  ###* @type {asteroids.components.Position} ###
  audio     : null
