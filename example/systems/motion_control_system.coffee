'use strict'

MotionControlNode     = asteroids.nodes.MotionControlNode

class asteroids.systems.MotionControlSystem extends ash.tools.ListIteratingSystem

  ###* @type {asteroids.input.KeyPoll} ###
  keyPoll: null

  ###*
   * @constructor
   * @extends {ash.tools.ListIteratingSystem}
   * @param {asteroids.input.KeyPoll}
  ###
  constructor: (@keyPoll) ->
    super(MotionControlNode, @updateNode)

  ###*
   * @param {ash.core.Node}
   * @param {number}
  ###
  updateNode: (node, time) =>

    control = node.control
    position = node.position
    motion = node.motion

    left = @keyPoll.isDown(control.left)
    right = @keyPoll.isDown(control.right)

    position.rotation -= control.rotationRate * time  if left
    position.rotation += control.rotationRate * time  if right
    if @keyPoll.isDown(control.accelerate)
      motion.velocity.x += Math.cos(position.rotation) * control.accelerationRate * time
      motion.velocity.y += Math.sin(position.rotation) * control.accelerationRate * time

    return # Void

