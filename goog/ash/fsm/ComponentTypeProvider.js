goog.provide('ash.fsm.ComponentTypeProvider');

/**
 * @constructor
 * @param {Function} type The type of the single instance
 */
ash.fsm.ComponentTypeProvider = function(type) {
  this.componentType = type;
}

/**
 * @type {Function}
 */
ash.fsm.ComponentTypeProvider.prototype.componentType = null;

/**
 * Used to request a component from this provider
 *
 * @return {Object} The instance
 */
ash.fsm.ComponentTypeProvider.prototype.getComponent = function() {
  return new this.componentType();
};

/**
 * Used to compare this provider with others. Any provider that returns the same component
 * instance will be regarded as equivalent.
 *
 * @return {Object} The instance
 */
ash.fsm.ComponentTypeProvider.prototype.getIdentifier = function() {
  return this.componentType;
};