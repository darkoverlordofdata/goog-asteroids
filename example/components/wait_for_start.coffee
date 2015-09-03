'use strict'

class asteroids.components.WaitForStart

  ###* @type {string} ###
  @className: 'WaitForStart'

  ###* @type {Object} ###
  waitForStart: null
  
  ###* @type {boolean} ###
  startGame: false

  ###*
   * @constructor
   * @param {Object}
  ###
  constructor: (@waitForStart) ->
    @waitForStart.click.add(@setStartGame)

  ###*
   * Start game
  ###
  setStartGame: () =>
    @startGame = true
    return