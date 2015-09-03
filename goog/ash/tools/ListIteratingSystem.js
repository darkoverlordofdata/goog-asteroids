goog.provide('ash.tools.ListIteratingSystem');
goog.require('ash.core.System');
/*
 * A useful class for systems which simply iterate over a set of nodes, performing the same action on each node. This
 * class removes the need for a lot of boilerplate code in such systems. Extend this class and pass the node type and
 * a node update method into the constructor. The node update method will be called once per node on the update cycle
 * with the node instance and the frame time as parameters. e.g.
 *
 * <code>package;
 * class MySystem extends ListIteratingSystem<MyNode>
 * {
 *     public function new()
 *     {
 *         super(MyNode, updateNode);
 *     }
 *
 *     private function updateNode(node:MyNode, time:Float):Void
 *     {
 *         // process the node here
 *     }
 * }
 * </code>
 */

/**
 * @extends {ash.core.System}
 * @constructor
 * @param {Function} nodeClass
 * @param {Function} nodeUpdateFunction
 * @param {Function} nodeAddedFunction
 * @param {Function} nodeRemovedFunction
 */
ash.tools.ListIteratingSystem = function(nodeClass, nodeUpdateFunction, nodeAddedFunction, nodeRemovedFunction) {
  if (nodeAddedFunction == null) {
    nodeAddedFunction = null;
  }
  if (nodeRemovedFunction == null) {
    nodeRemovedFunction = null;
  }
  this.nodeClass = nodeClass;
  this.nodeUpdateFunction = nodeUpdateFunction;
  this.nodeAddedFunction = nodeAddedFunction;
  this.nodeRemovedFunction = nodeRemovedFunction;
}
goog.inherits(ash.tools.ListIteratingSystem, ash.core.System);

/**
 * @type {ash.core.NodeList}
 */
ash.tools.ListIteratingSystem.prototype.nodeList = null;

/**
 * @type {Function}
 */
ash.tools.ListIteratingSystem.prototype.nodeClass = null;

/**
 * @type {Function}
 */
ash.tools.ListIteratingSystem.prototype.nodeUpdateFunction = null;

/**
 * @type {Function}
 */
ash.tools.ListIteratingSystem.prototype.nodeAddedFunction = null;

/**
 * @type {Function}
 */
ash.tools.ListIteratingSystem.prototype.nodeRemovedFunction = null;

/**
 * System is added to engine
 * @param {ash.core.Engine}
 */
ash.tools.ListIteratingSystem.prototype.addToEngine = function(engine) {
  var node;
  this.nodeList = engine.getNodeList(this.nodeClass);
  if (this.nodeAddedFunction !== null) {
    node = this.nodeList.head;
    while (node) {
      this.nodeAddedFunction(node);
      node = node.next;
    }
    this.nodeList.nodeAdded.add(this.nodeAddedFunction);
  }
  if (this.nodeRemovedFunction !== null) {
    this.nodeList.nodeRemoved.add(this.nodeRemovedFunction);
  }
};

/**
 * System is removed from engine
 * @param {ash.core.Engine}
 */
ash.tools.ListIteratingSystem.prototype.removeFromEngine = function(engine) {
  if (this.nodeAddedFunction !== null) {
    this.nodeList.nodeAdded.remove(this.nodeAddedFunction);
  }
  if (this.nodeRemovedFunction !== null) {
    this.nodeList.nodeRemoved.remove(this.nodeRemovedFunction);
  }
  this.nodeList = null;
};

/**
 * frame update
 * @param {number} time ms since last update
 */
ash.tools.ListIteratingSystem.prototype.update = function(time) {
  var node;
  node = this.nodeList.head;
  while (node) {
    this.nodeUpdateFunction(node, time);
    node = node.next;
  }
};