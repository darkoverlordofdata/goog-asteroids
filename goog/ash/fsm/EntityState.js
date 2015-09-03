goog.provide('ash.fsm.EntityState');

/*
 * Represents a state for an EntityStateMachine. The state contains any number of ComponentProviders which
 * are used to add components to the entity when this state is entered.
 */
goog.require('ash.ext.Dictionary');
goog.require('ash.fsm.StateComponentMapping');
goog.require('ash.ext.Util');


/**
 * @constructor
 */
ash.fsm.EntityState = function() {
  this.providers = new ash.ext.Dictionary();
}

/**
 * @type {ash.ext.Dictionary}
 */
ash.fsm.EntityState.prototype.providers = null;

/**
 * Add a new ComponentMapping to this state. The mapping is a utility class that is used to
 * map a component type to the provider that provides the component.
 *
 * @param {Function} type The type of component to be mapped
 * @return {ash.fsm.StateComponentMapping} The component mapping to use when setting the provider for the component
 */
ash.fsm.EntityState.prototype.add = function(type) {
  return new ash.fsm.StateComponentMapping(this, ash.ext.Util.getClassName(type));
};

/**
 * Get the ComponentProvider for a particular component type.
 *
 * @param {Function} type The type of component to get the provider for
 * @return {Object} The ComponentProvider
 */
ash.fsm.EntityState.prototype.get = function(type) {
  return this.providers[type];
};

/**
 * To determine whether this state has a provider for a specific component type.
 *
 * @param {Function} type The type of component to look for a provider for
 * @return {boolean} true if there is a provider for the given type, false otherwise
 */
ash.fsm.EntityState.prototype.has = function(type) {
  return this.providers[type] !== null;
};