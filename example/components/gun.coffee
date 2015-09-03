'use strict'
Point = asteroids.ui.Point

class asteroids.components.Gun

  ###* @type {string} ###
  @className: 'Gun'

  ###* @type {boolean} ###
  shooting: false
  
  ###* @type {number} ###
  timeSinceLastShot: 0
  
  ###* @type {asteroids.ui.Point} ###
  offsetFromParent: null

  ###* @type {number} ###
  minimumShotInterval: 0
  
  ###* @type {number} ###
  bulletLifetime: 0

  ###*
   * @constructor
   * @param {number}
   * @param {number}
   * @param {number}
   * @param {number}
  ###
  constructor: (offsetX, offsetY, @minimumShotInterval, @bulletLifetime) ->

    @shooting = false
    @offsetFromParent = null
    @timeSinceLastShot = 0
    @offsetFromParent = new Point(offsetX, offsetY)
