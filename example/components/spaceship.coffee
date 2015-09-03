'use strict'

class asteroids.components.Spaceship

  ###* @type {string} ###
  @className: 'Spaceship'

  ###* @type {ash.fsm.EntityStateMachine} ###
  fsm: null

  ###*
   * @constructor
   * @param {ash.fsm.EntityStateMachine}
  ###
  constructor: (@fsm) ->
