goog.provide('ash.fsm.EngineState');

/*
 * Represents a state for a SystemStateMachine. The state contains any number of SystemProviders which
 * are used to add Systems to the Engine when this state is entered.
 */
goog.require('ash.fsm.SystemInstanceProvider');
goog.require('ash.fsm.SystemSingletonProvider');
goog.require('ash.fsm.DynamicSystemProvider');
goog.require('ash.fsm.StateSystemMapping');


/**
 * @constructor
 */
ash.fsm.EngineState = function() {
  this.providers = [];
}

/**
 * @type {Array<Object>}
 */
ash.fsm.EngineState.prototype.providers = null;

/**
 * Creates a mapping for the System type to a specific System instance. A
 * SystemInstanceProvider is used for the mapping.
 *
 * @param {ash.core.System} system The System instance to use for the mapping
 * @return {ash.fsm.StateSystemMapping} This StateSystemMapping, so more modifications can be applied
 */
ash.fsm.EngineState.prototype.addInstance = function(system) {
  return this.addProvider(new ash.fsm.SystemInstanceProvider(system));
};

/**
 * Creates a mapping for the System type to a single instance of the provided type.
 * The instance is not created until it is first requested. The type should be the same
 * as or extend the type for this mapping. A SystemSingletonProvider is used for
 * the mapping.
 *
 * @param {Function} type The type of the single instance to be created. If omitted, the type of the
 * mapping is used.
 * @return {ash.fsm.StateSystemMapping} This StateSystemMapping, so more modifications can be applied
 */
ash.fsm.EngineState.prototype.addSingleton = function(type) {
  return this.addProvider(new ash.fsm.SystemSingletonProvider(type));
};

/**
 * Creates a mapping for the System type to a method call.
 * The method should return a System instance. A DynamicSystemProvider is used for
 * the mapping.
 *
 * @param {Function} method The method to provide the System instance.
 * @return {ash.fsm.StateSystemMapping} This StateSystemMapping, so more modifications can be applied.
 */
ash.fsm.EngineState.prototype.addMethod = function(method) {
  return this.addProvider(new ash.fsm.DynamicSystemProvider(method));
};

/**
 * Adds any SystemProvider.
 *
 * @param provider The component provider to use.
 * @return {ash.fsm.StateSystemMapping} This StateSystemMapping, so more modifications can be applied.
 */
ash.fsm.EngineState.prototype.addProvider = function(provider) {
  var mapping;
  mapping = new ash.fsm.StateSystemMapping(this, provider);
  this.providers.push(provider);
  return mapping;
};