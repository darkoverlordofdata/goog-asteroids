'use strict'

###
  * @constructor
###
class asteroids.nodes.SpaceshipNode extends ash.core.Node

  ###* @type {string} ###
  @className: 'SpaceshipNode'

  ###* @type {Object.<string, Function} ###
  @components:
    spaceship : asteroids.components.Spaceship
    position  : asteroids.components.Position

  ###* @type {asteroids.components.Spaceship} ###
  spaceship : null
  ###* @type {asteroids.components.Position} ###
  position  : null

