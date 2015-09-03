'use strict'

###
  * @constructor
###
class asteroids.nodes.AudioNode extends ash.core.Node

  ###* @type {string} ###
  @className: 'AudioNode'
  
  ###* @type {Object.<string, Function} ###
  @components:
    audio : asteroids.components.Audio

  ###* @type {asteroids.components.Audio} ###
  audio : null

