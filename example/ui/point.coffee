'use strict'

class asteroids.ui.Point

  ###* @type {number} ###
  x: 0
  
  ###* @type {number} ###
  y: 0

  ###*
   * @constructor
   * @param {number}
   * @param {number}
  ###
  constructor: (@x = 0, @y = 0) ->

  ###*
   * @param {asteroids.ui.Point}
   * @param {asteroids.ui.Point}
  ###
  @distance: (point1, point2) ->
    dx = point1.x - point2.x
    dy = point1.y - point2.y
    return Math.sqrt( dx * dx + dy * dy )

  ###*
   * @param {asteroids.ui.Point}
   @ return {number}
  ###
  distanceSquaredTo: (targetPoint) ->
    dx = this.x - targetPoint.x
    dy = this.y - targetPoint.y
    return dx * dx + dy * dy

  ###*
   * @param {asteroids.ui.Point}
   @ return {number}
  ###
  distanceTo: (targetPoint) ->
    dx = this.x - targetPoint.x
    dy = this.y - targetPoint.y
    return Math.sqrt( dx * dx + dy * dy )