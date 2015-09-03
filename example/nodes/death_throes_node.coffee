'use strict'

###
  * @constructor
###
class asteroids.nodes.DeathThroesNode extends ash.core.Node

  ###* @type {string} ###
  @className: 'DeathThroesNode'

  ###* @type {Object.<string, Function} ###
  @components:
    death : asteroids.components.DeathThroes

  ###* @type {asteroids.components.DeathThroes} ###
  death : null

