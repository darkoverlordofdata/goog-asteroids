'use strict'

###
  * @constructor
###
class asteroids.nodes.SpaceshipCollisionNode extends ash.core.Node

  ###* @type {string} ###
  @className: 'SpaceshipCollisionNode'

  ###* @type {Object.<string, Function} ###
  @components:
    spaceship   : asteroids.components.Spaceship
    position    : asteroids.components.Position
    collision   : asteroids.components.Collision
    audio       : asteroids.components.Audio

  ###* @type {asteroids.components.Spaceship} ###
  spaceship   : null
  ###* @type {asteroids.components.Position} ###
  position    : null
  ###* @type {asteroids.components.Collision} ###
  collision   : null
  ###* @type {asteroids.components.Audio} ###
  audio       : null

