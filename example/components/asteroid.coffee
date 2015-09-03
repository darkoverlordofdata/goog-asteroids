'use strict'

class asteroids.components.Asteroid

  ###* @type {string} ###
  @className: 'Asteroid'
  
  ###* @type {ash.fsm.EntityStateMachine} ###
  fsm: null

  ###*
   * @constructor
   * @param {ash.fsm.EntityStateMachine}
  ###
  constructor: (@fsm) ->
