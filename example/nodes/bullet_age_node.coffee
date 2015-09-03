'use strict'

###
  * @constructor
###
class asteroids.nodes.BulletAgeNode extends ash.core.Node

  ###* @type {string} ###
  @classnName: 'BulletAgeNode'

  ###* @type {Object.<string, Function} ###
  @components:
    bullet : asteroids.components.Bullet

  ###* @type {asteroids.components.Bullet} ###
  bullet : null

