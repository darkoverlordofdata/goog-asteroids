'use strict'

###
  * @constructor
###
class asteroids.nodes.AnimationNode extends ash.core.Node

  ###* @type {string} ###
  @className: 'AnimationNode'
  
  ###* @type {Object.<string, Function} ###
  @components:
    animation : asteroids.components.Animation

  ###* @type {asteroids.components.Animation} ###
  animation : null

    