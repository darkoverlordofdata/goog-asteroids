'use strict'

class asteroids.graphics.SpaceshipView

  ###* @type {number} ###
  x: 0
  ###* @type {number} ###
  y: 0
  ###* @type {number} ###
  width: 20
  ###* @type {number} ###
  height: 20
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
    graphic.translate @x, @y
    graphic.rotate @rotation
    graphic.fillStyle = "#FFFFFF"
    graphic.moveTo 10, 0
    graphic.lineTo -7, 7
    graphic.lineTo -4, 0
    graphic.lineTo -7, -7
    graphic.lineTo 10, 0
    graphic.fill()
    graphic.restore()
    return

