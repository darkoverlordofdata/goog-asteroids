goog.provide('ash.fsm.SystemSingletonProvider');

/*
 * This System provider always returns the same instance of the System. The instance
 * is created when first required and is of the type passed in to the constructor.
 */

/**
 * @constructor
 *
 * @param {Function} type The type of the single System instance
 */
ash.fsm.SystemSingletonProvider = function(type) {
  this.componentType = type;
}

/**
 * @type {Object}
 */
ash.fsm.SystemSingletonProvider.prototype.componentType = null;

/**
 * @type {Object}
 */
ash.fsm.SystemSingletonProvider.prototype.instance = null;

/**
 * @type {number}
 */
ash.fsm.SystemSingletonProvider.prototype.priority = 0;

/**
 * Used to request a System from this provider
 *
 * @return {Object} The single instance
 */
ash.fsm.SystemSingletonProvider.prototype.getSystem = function() {
  if (!this.instance) {
    this.instance = new this.componentType();
  }
  return this.instance;
};

/**
 * Used to compare this provider with others. Any provider that returns the same single
 * instance will be regarded as equivalent.
 *
 * @type {Object} The single instance
 */
ash.fsm.SystemSingletonProvider.prototype.getIdentifier = function() {
  return this.getSystem();
};