goog.provide('ash.fsm.ComponentInstanceProvider');

/*
 * This component provider always returns the same instance of the component. The instance
 * is passed to the provider at initialisation.
 */

/**
 * @constructor
 * @param {Object} instance The instance to return whenever a component is requested.
 */
ash.fsm.ComponentInstanceProvider = function(_at_instance) {
  this.instance = _at_instance;
}

/**
 * @type {Object}
 */
ash.fsm.ComponentInstanceProvider.prototype.instance = null;

/**
 * Used to request a component from this provider
 *
 * @return {Object} The instance
 */
ash.fsm.ComponentInstanceProvider.prototype.getComponent = function() {
  return this.instance;
};

/**
 * Used to compare this provider with others. Any provider that returns the same component
 * instance will be regarded as equivalent.
 *
 * @return {Object} The instance
 */
ash.fsm.ComponentInstanceProvider.prototype.getIdentifier = function() {
  return this.instance;
};