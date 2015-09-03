'use strict'

###
  * @constructor
###
class asteroids.nodes.BulletCollisionNode extends ash.core.Node

  ###* @type {string} ###
  @className: 'BulletCollisionNode'
  
  ###* @type {Object.<string, Function} ###
  @components:
    bullet    : asteroids.components.Bullet
    position  : asteroids.components.Position
    collision : asteroids.components.Collision

  ###* @type {asteroids.components.Bullet} ###
  bullet    : null
  ###* @type {asteroids.components.Position} ###
  position  : null
  ###* @type {asteroids.components.Collision} ###
  collision : null

