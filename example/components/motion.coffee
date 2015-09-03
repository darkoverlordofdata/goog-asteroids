'use strict'
Point = asteroids.ui.Point

class asteroids.components.Motion

  ###* @type {string} ###
  @className: 'Motion'

  ###* @type {number} ###
  velocity: null
  
  ###* @type {asteroids.ui.Point} ###
  angularVelocity: 0
  
  ###* @type {number} ###
  damping: 0

  ###*
   * @constructor
   * @param {number}
   * @param {number}
   * @param {number}
   * @param {number}
  ###
  constructor: (velocityX, velocityY, @angularVelocity, @damping) ->

    @velocity = new Point(velocityX, velocityY)
