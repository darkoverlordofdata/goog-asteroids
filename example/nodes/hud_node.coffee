'use strict'

###
  * @constructor
###
class asteroids.nodes.HudNode extends ash.core.Node

  ###* @type {string} ###
  @className: 'HudNode'

  ###* @type {Object.<string, Function} ###
  @components:
    state : asteroids.components.GameState
    hud   : asteroids.components.Hud

  ###* @type {asteroids.components.GameState} ###
  state : null
  ###* @type {asteroids.components.Hud} ###
  hud   : null
