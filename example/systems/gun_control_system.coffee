'use strict'

GunControlNode = asteroids.nodes.GunControlNode

class asteroids.systems.GunControlSystem extends ash.tools.ListIteratingSystem

  ###* @type {asteroids.input.KeyPoll} ###
  keyPoll: null
  
  ###* @type {asteroids.EntityCreator} ###
  creator: null

  ###*
   * @constructor
   * @extends {ash.tools.ListIteratingSystem}
   * @param {asteroids.EntityCreator}
   * @param {asteroids.input.KeyPoll}
  ###
  constructor: (@keyPoll, @creator) ->
    super(GunControlNode, @updateNode)

  ###*
   * @param {ash.core.Node}
   * @param {number}
  ###
  updateNode: (node, time) =>
    control = node.control
    position = node.position
    gun = node.gun
    gun.shooting = @keyPoll.isDown(control.trigger)
    gun.timeSinceLastShot += time
    if gun.shooting and gun.timeSinceLastShot >= gun.minimumShotInterval
      @creator.createUserBullet gun, position
      gun.timeSinceLastShot = 0
    return # Void

