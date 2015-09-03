goog.provide('ash.fsm.StateSystemMapping');

/*
 * Used by the SystemState class to create the mappings of Systems to providers via a fluent interface.
 */

/**
 * Used internally, the constructor creates a component mapping. The constructor
 * creates a SystemSingletonProvider as the default mapping, which will be replaced
 * by more specific mappings if other methods are called.
 *
 * @constructor
 * @param {Object} creatingState The SystemState that the mapping will belong to
 * @param {Object} type The System type for the mapping
 */
ash.fsm.StateSystemMapping = function(_at_creatingState, _at_provider) {
  this.creatingState = _at_creatingState;
  this.provider = _at_provider;
}

/**
 * @type {Object}
 */
ash.fsm.StateSystemMapping.prototype.creatingState = null;

/**
 * @type {Object}
 */
ash.fsm.StateSystemMapping.prototype.provider = null;

/**
 * Applies the priority to the provider that the System will be.
 *
 * @param {number} priority The component provider to use.
 * @return {ash.fsm.StateSystemMapping} This StateSystemMapping, so more modifications can be applied.
 */
ash.fsm.StateSystemMapping.prototype.withPriority = function(priority) {
  this.provider.priority = priority;
  return this;
};

/**
 * Creates a mapping for the System type to a specific System instance. A
 * SystemInstanceProvider is used for the mapping.
 *
 * @param {Object} system The System instance to use for the mapping
 * @return {ash.fsm.StateSystemMapping} This StateSystemMapping, so more modifications can be applied
 */
ash.fsm.StateSystemMapping.prototype.addInstance = function(system) {
  return creatingState.addInstance(system);
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
ash.fsm.StateSystemMapping.prototype.addSingleton = function(type) {
  return creatingState.addSingleton(type);
};

/**
 * Creates a mapping for the System type to a method call.
 * The method should return a System instance. A DynamicSystemProvider is used for
 * the mapping.
 *
 * @param {Function} method The method to provide the System instance.
 * @return {ash.fsm.StateSystemMapping}This StateSystemMapping, so more modifications can be applied.
 */
ash.fsm.StateSystemMapping.prototype.addMethod = function(method) {
  return creatingState.addMethod(method);
};

/*
 * Maps through to the addProvider method of the SystemState that this mapping belongs to
 * so that a fluent interface can be used when configuring entity states.
 *
 * @param {Object} provider The component provider to use.
 * @return {ash.fsm.StateSystemMapping} This StateSystemMapping, so more modifications can be applied.
 */
ash.fsm.StateSystemMapping.prototype.addProvider = function(provider) {
  return creatingState.addProvider(provider);
};

/*
 */