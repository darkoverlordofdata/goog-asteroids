'use strict'

RenderNode = asteroids.nodes.RenderNode

class asteroids.systems.RenderSystem extends ash.core.System


  ###* @type {CanvasRenderingContext2D} ###
  graphic: null
  
  ###* @type {ash.core.NodeList} ###
  nodes: null 

  ###*
   * @constructor
   * @extends {ash.core.System}
   * @param {CanvasRenderingContext2D}
  ###
  constructor: (@graphic) ->

  ###*
   * @param {ash.core.Engine}
  ###
  addToEngine: (engine) ->
    @nodes = engine.getNodeList(RenderNode)
    node = @nodes.head

    while node
      @addToDisplay node
      node = node.next
#    @nodes.nodeAdded.add @addToDisplay, this
#    @nodes.nodeRemoved.add @removeFromDisplay, this
    return # Void

  ###*
   * @param {ash.core.Node}
  ###
  addToDisplay:(node) ->

  ###*
   * @param {ash.core.Node}
  ###
  removeFromDisplay: (node) ->


  ###*
   * @param {ash.core.Engine}
  ###
  removeFromEngine: (engine) ->
    @nodes = null
    return # Void

  ###*
   * @param {number}
  ###
  update: (time) =>

    @graphic.save()
    @graphic.translate 0, 0
    @graphic.rotate 0
    @graphic.clearRect 0, 0, @graphic.canvas.width, @graphic.canvas.height
    node = @nodes.head

    while node

      display = node.display
      graphic = display.graphic
      position = node.position
      graphic.x = position.position.x
      graphic.y = position.position.y
      graphic.rotation = position.rotation
      graphic.draw()
      node = node.next

    @graphic.restore()
    return # Void
