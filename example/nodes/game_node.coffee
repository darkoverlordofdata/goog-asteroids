'use strict'

###
  * @constructor
###
class asteroids.nodes.GameNode extends ash.core.Node

  ###* @type {string} ###
  @className: 'GameNode'

  ###* @type {Object.<string, Function} ###
  @components:
    state : asteroids.components.GameState

  ###* @type {asteroids.components.GameState} ###
  state : null
