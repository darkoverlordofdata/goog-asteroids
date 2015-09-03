'use strict'

class asteroids.components.DeathThroes

  ###* @type {string} ###
  @className: 'DeathThroes'

  ###* @type {number} ###
  countdown: 0

  ###*
   * @constructor
   * @param {number}
  ###
  constructor: (duration) ->
    @countdown = duration
