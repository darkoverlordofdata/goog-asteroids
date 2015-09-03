'use strict'

class asteroids.components.MotionControls

  ###* @type {string} ###
  @className: 'MotionControls'

  ###* @type {number} ###
  left: 0

  ###* @type {number} ###
  right: 0

  ###* @type {number} ###
  accelerate: 0

  ###* @type {number} ###
  accelerationRate: 0

  ###* @type {number} ###
  rotationRate: 0

  ###*
   * @constructor
   * @param {number}
   * @param {number}
   * @param {number}
   * @param {number}
   * @param {number}
  ###
  constructor: (@left, @right, @accelerate, @accelerationRate, @rotationRate) ->