'use strict'

class asteroids.components.GameState

  ###* @type {string} ###
  @className: 'GameState'

  ###* @type {number} ###
  lives: 3
  
  ###* @type {number} ###
  level: 0
  
  ###* @type {number} ###
  hits: 0
  
  ###* @type {boolean} ###
  playing: false

  ###*
   * @constructor
  ###
  setForStart: () ->
    @lives = 3
    @level = 0
    @hits = 0
    @playing = true
    return
