'use strict'

Signal0 = ash.signals.Signal0

class asteroids.graphics.WaitForStartView

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

  ###* @type {Function} ###
  gameOver: null
  ###* @type {Function} ###
  clickToStart: null
  ###* @type {Function} ###
  instructions: null
  ###* @type {ash.signals.Signal0} ###
  click: null
  
  ###*
   * @constructor
   * @param {CanvasRenderingContext2D}
  ###
  constructor: (@graphic) ->
    @click = new Signal0()
    @gameOver = @createGameOver
    @instructions = @createInstructions
    @clickToStart = @createClickToStart
    @graphic.canvas.addEventListener 'click', (event) =>
      @click.dispatch()

  ###*
   * draw the game over button
  ###
  createGameOver: () ->
    @graphic.save()
    @graphic.beginPath()
    @graphic.font = 'bold 32px Helvetica'
    @graphic.fillStyle = '#FFFFFF'
#    @graphic.textAlign = 'center'

    s = 'ASTEROIDS'
    l = @graphic.measureText(s)
    x = Math.floor(((window.innerWidth*window.devicePixelRatio)-l.width)/2)
    y = 175
    @graphic.fillText(s, x, y)
    @graphic.fill()
    @graphic.restore()
    return

  ###*
   * draw the start button
  ###
  createClickToStart: () ->
    @graphic.save()
    @graphic.beginPath()
    @graphic.font = 'bold 18px Helvetica'
    @graphic.fillStyle = '#FFFFFF'
#    @graphic.textAlign = 'center'

    s = 'CLICK TO START'
    l = @graphic.measureText(s)
    x = Math.floor(((window.innerWidth*window.devicePixelRatio)-l.width)/2)
    y = 225
    @graphic.fillText(s, x, y)
    @graphic.fill()
    @graphic.restore()
    return

  ###*
   * draw the instructions
  ###
  createInstructions: () ->
    @graphic.save()
    @graphic.beginPath()
    @graphic.font = 'bold 14px Helvetica'
    @graphic.fillStyle = '#FFFFFF'
    #    @graphic.textAlign = 'center'

    s = 'CTRL-Z to Fire  ~  Arrow Keys to Move'
    l = @graphic.measureText(s)
    x = 10
    y = window.innerHeight*window.devicePixelRatio-20
    @graphic.fillText(s, x, y)
    @graphic.fill()
    @graphic.restore()
    return

  ###*
   * draw the view
  ###
  draw: ->
    @gameOver()
    @clickToStart()
    @instructions()
    return

