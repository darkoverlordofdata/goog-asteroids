goog.provide('ash.fsm.DynamicSystemProvider');

/*
 * This System provider returns results of a method call. The method
 * is passed to the provider at initialisation.
 */

/**
 * @constructor
 * @param {Function} method The method that returns the System instance;
 */
ash.fsm.DynamicSystemProvider = function(_at_method) {
  this.method = _at_method;
}

/**
 * @type {Function}
 */
ash.fsm.DynamicSystemProvider.prototype.method = function() {};

/**
 * The priority at which the System should be added to the Engine
 * @type {number}
 */
ash.fsm.DynamicSystemProvider.prototype.priority = 0;

/*
 * Used to compare this provider with others. Any provider that returns the same component
 * instance will be regarded as equivalent.
 *
 * @return {Function} The method used to call the System instances
 */
ash.fsm.DynamicSystemProvider.prototype.getSystem = function() {
  return this.method();
};

/*
 * The priority at which the System should be added to the Engine
 * @return {Function}
 */
ash.fsm.DynamicSystemProvider.prototype.getIdentifier = function() {
  return this.method;
};