goog.provide('ash.ext.Helper');

/*
 * A Helper for Components & Nodes
 *
 * Creates a common registry object
 * Fix-up up Node templates
 */

/**
 * @constructor
 * @param {Object} components
 * @param {Object} nodes
 */
ash.ext.Helper = function(components, nodes) {
  var klass, name, property, type, _ref;
  this.components = {};
  this.nodes = {};
  
/*
   * register components
   */
  if (components != null) {
    for (name in components) {
      klass = components[name];
      this.components[name] = klass;
    }
  }
  
/*
   * register nodes
   */
  if (nodes != null) {
    for (name in nodes) {
      klass = nodes[name];
      
/*
       * convert template to an actual node class
       */
      if (klass.components == null) {
        klass.components = {};
        _ref = klass.prototype;
        for (property in _ref) {
          type = _ref[property];
          klass.components[property] = type;
          klass.prototype[property] = null;
        }
        klass.prototype.entity = null;
        klass.prototype.previous = null;
        klass.prototype.next = null;
      }
      if (components != null) {
        this.nodes[name] = klass;
      }
    }
  }
}

/**
 * @type {Object}
 */
ash.ext.Helper.prototype.components = null;

/**
 * @type {Object}
 */
ash.ext.Helper.prototype.nodes = null;