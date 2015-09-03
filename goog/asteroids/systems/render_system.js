goog.provide('asteroids.systems.RenderSystem');
goog.require('ash.core.System');
goog.require('asteroids.nodes.RenderNode');


/**
 * @constructor
 * @extends {ash.core.System}
 * @param {CanvasRenderingContext2D}
 */
asteroids.systems.RenderSystem = function(_at_graphic) {
  this.graphic = _at_graphic;
  this.update = goog.bind(this.update, this);
}
goog.inherits(asteroids.systems.RenderSystem, ash.core.System);

/** @type {CanvasRenderingContext2D} */
asteroids.systems.RenderSystem.prototype.graphic = null;

/** @type {ash.core.NodeList} */
asteroids.systems.RenderSystem.prototype.nodes = null;

/**
 * @param {ash.core.Engine}
 */
asteroids.systems.RenderSystem.prototype.addToEngine = function(engine) {
  var node;
  this.nodes = engine.getNodeList(asteroids.nodes.RenderNode);
  node = this.nodes.head;
  while (node) {
    this.addToDisplay(node);
    node = node.next;
  }
};

/**
 * @param {ash.core.Node}
 */
asteroids.systems.RenderSystem.prototype.addToDisplay = function(node) {};

/**
 * @param {ash.core.Node}
 */
asteroids.systems.RenderSystem.prototype.removeFromDisplay = function(node) {};

/**
 * @param {ash.core.Engine}
 */
asteroids.systems.RenderSystem.prototype.removeFromEngine = function(engine) {
  this.nodes = null;
};

/**
 * @param {number}
 */
asteroids.systems.RenderSystem.prototype.update = function(time) {
  var display, graphic, node, position;
  this.graphic.save();
  this.graphic.translate(0, 0);
  this.graphic.rotate(0);
  this.graphic.clearRect(0, 0, this.graphic.canvas.width, this.graphic.canvas.height);
  node = this.nodes.head;
  while (node) {
    display = node.display;
    graphic = display.graphic;
    position = node.position;
    graphic.x = position.position.x;
    graphic.y = position.position.y;
    graphic.rotation = position.rotation;
    graphic.draw();
    node = node.next;
  }
  this.graphic.restore();
};