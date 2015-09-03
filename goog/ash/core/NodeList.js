goog.provide('ash.core.NodeList');

/*
 * A collection of nodes.
 *
 * <p>Systems within the engine access the components of entities via NodeLists. A NodeList contains
 * a node for each Entity in the engine that has all the components required by the node. To iterate
 * over a NodeList, start from the head and step to the next on each loop, until the returned value
 * is null. Or just use for in syntax.</p>
 *
 * <p>for (node in nodeList)
 * {
 *   // do stuff
 * }</p>
 *
 * <p>It is safe to remove items from a nodelist during the loop. When a Node is removed form the
 * NodeList it's previous and next properties still point to the nodes that were before and after
 * it in the NodeList just before it was removed.</p>
 */
goog.require('ash.signals.Signal1');


/**
 * @constructor
 */
ash.core.NodeList = function() {
  this.nodeAdded = new ash.signals.Signal1();
  this.nodeRemoved = new ash.signals.Signal1();
}

/**
 * The first item in the node list, or null if the list contains no nodes.
 * @type {ash.core.Node}
 */
ash.core.NodeList.prototype.head = null;

/**
 * The last item in the node list, or null if the list contains no nodes.
 * @type {ash.core.Node}
 */
ash.core.NodeList.prototype.tail = null;

/**
 * A signal that is dispatched whenever a node is added to the node list.
 *
 * <p>The signal will pass a single parameter to the listeners - the node that was added.</p>
 * @type {ash.signals.Signal1}
 */
ash.core.NodeList.prototype.nodeAdded = null;

/**
 * A signal that is dispatched whenever a node is removed from the node list.
 *
 * <p>The signal will pass a single parameter to the listeners - the node that was removed.</p>
 * @type {ash.signals.Signal1}
 */
ash.core.NodeList.prototype.nodeRemoved = null;

/**
 * @param {ash.core.Node} node to add
 */
ash.core.NodeList.prototype.add = function(node) {
  if (!this.head) {
    this.head = this.tail = node;
    node.next = node.previous = null;
  } else {
    this.tail.next = node;
    node.previous = this.tail;
    node.next = null;
    this.tail = node;
  }
  this.nodeAdded.dispatch(node);
};

/**
 * @param {ash.core.Node} node to remove
 */
ash.core.NodeList.prototype.remove = function(node) {
  if (this.head === node) {
    this.head = this.head.next;
  }
  if (this.tail === node) {
    this.tail = this.tail.previous;
  }
  if (node.previous) {
    node.previous.next = node.next;
  }
  if (node.next) {
    node.next.previous = node.previous;
  }
  this.nodeRemoved.dispatch(node);
};

/**
 * remove all nodes
 */
ash.core.NodeList.prototype.removeAll = function() {
  var node;
  while (this.head) {
    node = this.head;
    this.head = this.head.next;
    node.previous = null;
    node.next = null;
    this.nodeRemoved.dispatch(node);
  }
  this.tail = null;
};

/**
 * true if the list is empty, false otherwise.
 * @type {boolean}
 */
ash.core.NodeList.prototype.isEmpty = function() {
  return this.head === null;
};

/**
 * Swaps the positions of two nodes in the list. Useful when sorting a list.
 *
 * @private
 */
ash.core.NodeList.prototype.swap = function(node1, node2) {
  var temp;
  if (node1.previous === node2) {
    node1.previous = node2.previous;
    node2.previous = node1;
    node2.next = node1.next;
    node1.next = node2;
  } else if (node2.previous === node1) {
    node2.previous = node1.previous;
    node1.previous = node2;
    node1.next = node2.next;
    node2.next = node1;
  } else {
    temp = node1.previous;
    node1.previous = node2.previous;
    node2.previous = temp;
    temp = node1.next;
    node1.next = node2.next;
    node2.next = temp;
  }
  if (this.head === node1) {
    this.head = node2;
  } else if (this.head === node2) {
    this.head = node1;
  }
  if (this.tail === node1) {
    this.tail = node2;
  } else if (this.tail === node2) {
    this.tail = node1;
  }
  if (node1.previous !== null) {
    node1.previous.next = node1;
  }
  if (node2.previous !== null) {
    node2.previous.next = node2;
  }
  if (node1.next !== null) {
    node1.next.previous = node1;
  }
  if (node2.next !== null) {
    node2.next.previous = node2;
  }
};

/**
 * Performs an insertion sort on the node list. In general, insertion sort is very efficient with short lists
 * and with lists that are mostly sorted, but is inefficient with large lists that are randomly ordered.
 *
 * <p>The sort function takes two nodes and returns an Int.</p>
 *
 * <p><code>function sortFunction( node1 : MockNode, node2 : MockNode ) : Int</code></p>
 *
 * <p>If the returned number is less than zero, the first node should be before the second. If it is greater
 * than zero the second node should be before the first. If it is zero the order of the nodes doesn't matter
 * and the original order will be retained.</p>
 *
 * <p>This insertion sort implementation runs in place so no objects are created during the sort.</p>
 *
 * @private
 * @param {Function} sort function
 */
ash.core.NodeList.prototype.insertionSort = function(sortFunction) {
  var node, other, remains;
  if (this.head === this.tail) {
    return;
  }
  remains = this.head.next;
  node = remains;
  while (node !== null) {
    remains = node.next;
    other = node.previous;
    while (other !== null) {
      if (sortFunction(node, other) >= 0) {
        if (node !== other.next) {
          if (this.tail === node) {
            this.tail = node.previous;
          }
          node.previous.next = node.next;
          if (node.next !== null) {
            node.next.previous = node.previous;
          }
          node.next = other.next;
          node.previous = other;
          node.next.previous = node;
          other.next = node;
        }
        break;
      }
      other = other.previous;
    }
    if (other === null) {
      if (this.tail === node) {
        this.tail = node.previous;
      }
      node.previous.next = node.next;
      if (node.next !== null) {
        node.next.previous = node.previous;
      }
      node.next = this.head;
      this.head.previous = node;
      node.previous = null;
      this.head = node;
    }
    node = remains;
  }
};

/*
 * Performs a merge sort on the node list. In general, merge sort is more efficient than insertion sort
 * with long lists that are very unsorted.
 *
 * <p>The sort function takes two nodes and returns an Int.</p>
 *
 * <p><code>function sortFunction( node1 : MockNode, node2 : MockNode ) : Int</code></p>
 *
 * <p>If the returned number is less than zero, the first node should be before the second. If it is greater
 * than zero the second node should be before the first. If it is zero the order of the nodes doesn't matter.</p>
 *
 * <p>This merge sort implementation creates and uses a single Vector during the sort operation.</p>
 *
 * @private
 * @param {Function} sort function
 */
ash.core.NodeList.prototype.mergeSort = function(sortFunction) {
  var end, lists, next, start;
  if (this.head === this.tail) {
    return;
  }
  lists = [];
  start = this.head;
  while (start !== null) {
    end = start;
    while (end.next !== null && sortFunction(end, end.next) <= 0) {
      end = end.next;
    }
    next = end.next;
    start.previous = end.next = null;
    lists.push(start);
    start = next;
  }
  while (lists.length > 1) {
    lists.push(this.merge(lists.shift(), lists.shift(), sortFunction));
  }
  this.tail = this.head = lists[0];
  while (this.tail.next !== null) {
    this.tail = this.tail.next;
  }
};

/*
 *
 * @private
 * @param {ash.core.Node} head1
 * @param {ash.core.Node} head2
 * @param {Function} sort function
 */
ash.core.NodeList.prototype.merge = function(head1, head2, sortFunction) {
  var head, node;
  if (sortFunction(head1, head2) <= 0) {
    head = node = head1;
    head1 = head1.next;
  } else {
    head = node = head2;
    head2 = head2.next;
  }
  while (head1 !== null && head2 !== null) {
    if (sortFunction(head1, head2) <= 0) {
      node.next = head1;
      head1.previous = node;
      node = head1;
      head1 = head1.next;
    } else {
      node.next = head2;
      head2.previous = node;
      node = head2;
      head2 = head2.next;
    }
  }
  if (head1 !== null) {
    node.next = head1;
    head1.previous = node;
  } else {
    node.next = head2;
    head2.previous = node;
  }
  return head;
};