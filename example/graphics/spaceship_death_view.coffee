'use strict'

Point = asteroids.ui.Point

class asteroids.graphics.SpaceshipDeathView

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

  ###* @type {asteroids.ui.Point} ###
  vel1: null
  ###* @type {asteroids.ui.Point} ###
  vel2: null
  ###* @type {number} ###
  rot1: null
  ###* @type {number} ###
  rot2: null
  ###* @type {number} ###
  x1: 0
  ###* @type {number} ###
  y2: 0
  ###* @type {number} ###
  y1: 0
  ###* @type {number} ###
  y2: 0
  ###* @type {boolean} ###
  first: true


  ###*
   * @constructor
   * @param {CanvasRenderingContext2D}
  ###
  constructor: (@graphic) ->


  ###*
   * @param {number}
  ###
  animate: (time) ->

    if @first
      @first = false
      @vel1 = new Point(Math.random() * 10 - 5, Math.random() * 10 + 10)
      @vel2 = new Point(Math.random() * 10 - 5, - ( Math.random() * 10 + 10 ))
      @rot1 = Math.random() * 300 - 150
      @rot2 = Math.random() * 300 - 150
      @x1 = @x2 = @x
      @y1 = @y2 = @y
      @r1 = @r2 = @rotation

    @x1 += @vel1.x * time
    @y1 += @vel1.y * time
    @r1 += @rot1 * time

    @x2 += @vel2.x * time
    @y2 += @vel2.y * time
    @r2 += @rot2 * time
    @draw()


  ###*
   * draw the view
  ###
  draw: ->
    graphic = @graphic

    # shape1
    graphic.save()
    graphic.beginPath()
    graphic.translate @x+@x1, @y+@y1
    graphic.rotate @r1
    graphic.fillStyle = "#FFFFFF"
    graphic.moveTo 10, 0
    graphic.lineTo -7, 7
    graphic.lineTo -4, 0
    graphic.lineTo 10, 0
    graphic.fill()
    graphic.restore()

    # shape2
    graphic.save()
    graphic.beginPath()
    graphic.translate @x+@x2, @y+@y2
    graphic.rotate @r2
    graphic.fillStyle = "#FFFFFF"
    graphic.moveTo 10, 0
    graphic.lineTo -7, 7
    graphic.lineTo -4, 0
    graphic.lineTo 10, 0
    graphic.fill()
    graphic.restore()

    return

