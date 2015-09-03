'use strict'

Point = asteroids.ui.Point

class asteroids.graphics.AsteroidDeathView

  ###* @const ###
  numDots = 8

  ###* @type {Array<Dot>} ###
  dots: null
  
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
  
  ###* @type {asteroids.ui.Point}  ###
  points: null
  
  ###* @type {number} ###
  count: 0
  
  ###* @type {boolean} ###
  first: true

  ###*
   * @constructor
   * @param {CanvasRenderingContext2D}
   * @param {number}
  ###
  constructor: (@graphic, @radius) ->
    @dots = []

  ###*
   * @param {number}
  ###
  animate: (time) ->
    if @first
      @first = false
      for i in [0...numDots]
        dot = new Dot(@graphic, @radius)
        @dots.push(dot)

    for dot in @dots
      dot.x += dot.velocity.x * time
      dot.y += dot.velocity.y * time
    @draw()

  ###*
   * draw the view
  ###
  draw: ->
    for dot in @dots
      dot.draw(@x, @y)


  class Dot
  
    ###* @type {asteroids.ui.Point} ###
    velocity: null
    
    ###* @type {CanvasRenderingContext2D} ###
    graphic: null
    
    ###* @type {number} ###
    x1: 0
    
    ###* @type {number} ###
    y1: 0
    
    ###* @type {number} ###
    x: 0
    
    ###* @type {number} ###
    y: 0
  
    ###*
    * @constructor
    * @param {CanvasRenderingContext2D}
    * @param {number}
    ###
    constructor: (@graphic, maxDistance) ->
  
      angle = Math.random() * 2 * Math.PI
      distance = Math.random() * maxDistance
      @x = Math.cos( angle ) * distance
      @y = Math.sin( angle ) * distance
      speed = Math.random() * 10 + 10
      @velocity = new Point(Math.cos(angle)*speed, Math.sin(angle)*speed)
  
    ###*
    * @param {number}
    * @param {number}
    ###
    draw:(x, y) ->
  
      graphic = @graphic
      graphic.save()
      graphic.beginPath()
      graphic.translate x, y
      graphic.rotate @rotation
      graphic.fillStyle = "#FFFFFF"
      graphic.arc @x, @y, 2, 0, Math.PI * 2, false
      graphic.fill()
      graphic.restore()
      return
