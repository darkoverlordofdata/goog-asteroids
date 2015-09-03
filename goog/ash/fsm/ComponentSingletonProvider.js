goog.provide('ash.fsm.ComponentSingletonProvider');

/**
 * @constructor
 * @param {Function} type The type of the single instance
 */
ash.fsm.ComponentSingletonProvider = function(type) {
  this.componentType = type;
}

/**
 * @type {Function}
 */
ash.fsm.ComponentSingletonProvider.prototype.componentType = null;

/**
 * @type {Object}
 */
ash.fsm.ComponentSingletonProvider.prototype.instance = null;

/**
  * Used to request a component from this provider
  *
  * @return {Object} The instance
 */
ash.fsm.ComponentSingletonProvider.prototype.getComponent = function() {
  if (this.instance == null) {
    this.instance = new this.componentType();
  }
  return this.instance;
};

/**
 * Used to compare this provider with others. Any provider that returns the same component
 * instance will be regarded as equivalent.
 *
 * @return {Object} The instance
 */
ash.fsm.ComponentSingletonProvider.prototype.getIdentifier = function() {
  return this.getComponent();
};