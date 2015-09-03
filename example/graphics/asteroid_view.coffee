'use strict'

class asteroids.graphics.AsteroidView

  ###* @type {number} ###
  x: 0
  ###* @type {number} ###
  y: 0
  ###* @type {number} ###
  width: 0
  ###* @type {number} ###
  height: 0
  ###* @type {number} ###
  rotation: 0
  ###* @type {CanvasRenderingContext2D} ###
  graphic: null
  ###* @type {number} ###
  radius: 0
  ###* @type {Array<asteroids.ui.Point>}  ###
  points: null
  ###* @type {number} ###
  count: 0


  ###*
   * @constructor
   * @param {CanvasRenderingContext2D}
   * @param {number}
  ###
  constructor: (@graphic, @radius) ->
    @width = @radius
    @height = @radius
    @points = []
    angle = 0
    while angle < Math.PI * 2
      length = (0.75 + Math.random() * 0.25) * @radius
      posX = Math.cos(angle) * length
      posY = Math.sin(angle) * length
      @points.push
        x: posX
        y: posY

      angle += Math.random() * 0.5

  ###*
   * draw the view
  ###
  draw: ->
    graphic = @graphic
    graphic.save()
    graphic.beginPath()
    graphic.translate @x, @y
    graphic.rotate @rotation
    graphic.fillStyle = "#FFFFFF"
    graphic.moveTo @radius, 0
    i = 0

    while i < @points.length
      graphic.lineTo @points[i].x, @points[i].y
      ++i
    graphic.lineTo @radius, 0
    graphic.fill()
    graphic.restore()
    return


