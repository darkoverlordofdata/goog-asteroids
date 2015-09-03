'use strict'

###
  * @constructor
###
class asteroids.nodes.WaitForStartNode extends ash.core.Node

  ###* @type {string} ###
  @className: 'WaitForStartNode'

  ###* @type {Object.<string, Function} ###
  @components:
    wait : asteroids.components.WaitForStart

  ###* @type {asteroids.components.WaitForStart} ###
  wait : null
