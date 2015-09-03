'use strict'
Point = asteroids.ui.Point

class asteroids.components.Position

  ###* @type {string} ###
  @className: 'Position'

  ###* @type {asteroids.ui.Point} ###
  position: null
  
  ###* @type {number} ###
  rotation: 0

  ###*
   * @constructor
   * @param {number}
   * @param {number}
   * @param {number}
  ###
  constructor: (x, y, @rotation) ->

    @position = new Point(x, y)
