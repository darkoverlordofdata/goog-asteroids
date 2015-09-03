'use strict'

###
  * @constructor
###
class asteroids.nodes.AsteroidCollisionNode extends ash.core.Node

  ###* @type {string} ###
  @className: 'AsteroidCollisionNode'

  ###* @type {Object.<string, Function} ###
  @components:
    asteroid  : asteroids.components.Asteroid
    position  : asteroids.components.Position
    collision : asteroids.components.Collision
    audio     : asteroids.components.Audio

  ###* @type {asteroids.components.Asteroid} ###
  asteroid  : null
  ###* @type {asteroids.components.Position} ###
  position  : null
  ###* @type {asteroids.components.Collision} ###
  collision : null
  ###* @type {asteroids.components.Audio} ###
  audio     : null
