'use strict'
class asteroids.input.KeyPoll

  ###* @type {Object.<string, boolean>} ###
  states: null
  
  ###* @type Window} ###
  displayObj: null

  ###*
   * @constructor
   * @param {Window} window
  ###
  constructor:(@displayObj) ->
    @states = {}
    @displayObj.addEventListener "keydown", @keyDownListener
    @displayObj.addEventListener "keyup", @keyUpListener

  ###*
   * @private
   * @param {KeyboardEvent}
  ###
  keyDownListener: (event) =>
    @states[event.keyCode] = true
    return

  ###*
   * @private
   * @param {KeyboardEvent}
  ###
  keyUpListener: (event) =>
    @states[event.keyCode] = false  if @states[event.keyCode]
    return

  ###*
   * @param {string}
   * @return {boolean}
  ###
  isDown: (keyCode) =>
    return @states[keyCode]

  ###*
   * @param {string}
   * @return {boolean}
  ###
  isUp: (keyCode) =>
    return not @states[keyCode]
