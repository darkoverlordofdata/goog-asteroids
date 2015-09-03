'use strict'

class asteroids.graphics.BulletView

  ###* @type {number} ###
  x: 0
  ###* @type {number} ###
  y: 0
  ###* @type {number} ###
  width: 4
  ###* @type {number} ###
  height: 4
  ###* @type {number} ###
  rotation: 0
  ###* @type {CanvasRenderingContext2D} ###
  graphic: null
  
  ###*
   * @constructor
   * @param {CanvasRenderingContext2D}
  ###
  constructor: (@graphic) ->

  ###*
   * draw the view
  ###
  draw: ->
    graphic = @graphic
    graphic.save()
    graphic.beginPath()
    graphic.rotate @rotation
    graphic.fillStyle = "#FFFFFF"
    graphic.arc @x, @y, 2, 0, Math.PI * 2, false
    graphic.fill()
    graphic.restore()
    return

