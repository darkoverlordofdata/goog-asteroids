goog.provide('ash.fsm.DynamicComponentProvider');

/**
 * @constructor
 * @param {Object} closure The function that will return the component instance when called.
 */
ash.fsm.DynamicComponentProvider = function(closure) {
  this._closure = closure;
}

/**
 * @type {Object}
 */
ash.fsm.DynamicComponentProvider.prototype._closure = null;

/**
  * Used to request a component from this provider
  *
  * @return {Object} The instance
 */
ash.fsm.DynamicComponentProvider.prototype.getComponent = function() {
  return this._closure;
};

/**
 * Used to compare this provider with others. Any provider that returns the same component
 * instance will be regarded as equivalent.
 *
 * @return {Object} The instance
 */
ash.fsm.DynamicComponentProvider.prototype.getIdentifier = function() {
  return this._closure;
};