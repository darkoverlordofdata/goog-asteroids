'use strict'

class asteroids.graphics.HudView

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
  ###* @type {number} ###
  score: 0
  ###* @type {number} ###
  lives: 3
  ###* @type {Function} ###
  drawScore: null
  ###* @type {Function} ###
  drawLives: null

  ###*
   * @constructor
   * @param {CanvasRenderingContext2D}
  ###
  constructor: (@graphic) ->
    @drawScore = @createScore
    @drawLives = @createLives

  ###*
   * draw the view
  ###
  draw: =>
    @drawScore()
    @drawLives()
    return

  ###*
   * @param {number}
  ###
  setLives: (lives) =>
    @lives = lives

  ###*
   * @param {number}
  ###
  setScore: (score) =>
    @score = score

  ###*
   * draw the lives display
  ###
  createLives: () ->
    @graphic.save()
    @graphic.beginPath()
    @graphic.font = 'bold 18px Helvetica'
    @graphic.fillStyle = '#FFFFFF'
    @graphic.textAlign = 'center'
    s = "LIVES: #{@lives}"
    l = @graphic.measureText(s)
    x = l.width
    y = 20
    @graphic.fillText(s, x, y)
    @graphic.fill()
    @graphic.restore()
    return

  ###*
   * draw the score display
  ###
  createScore: () ->
    @graphic.save()
    @graphic.beginPath()
    @graphic.font = 'bold 18px Helvetica'
    @graphic.fillStyle = '#FFFFFF'
    @graphic.textAlign = 'center'
    s = "SCORE: #{@score}"
    l = @graphic.measureText(s)
    x = (window.window.innerWidth*window.devicePixelRatio)-l.width
    y = 20
    @graphic.fillText(s, x, y)
    @graphic.fill()
    @graphic.restore()
    return
