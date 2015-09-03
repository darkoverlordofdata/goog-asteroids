'use strict'

class asteroids.components.Audio

  ###* @type {string} ###
  @className: 'Audio'

  ###* @type {Array<Object>} ###
  toPlay: null

  ###*
   * @constructor
  ###
  constructor: () ->
    @toPlay = []

  ###*
   * @param {Object}
  ###
  play: (sound) ->
    @toPlay.push(sound)