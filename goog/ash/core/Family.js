goog.provide('ash.core.Family');

/*
 * The interface for classes that are used to manage NodeLists (set as the familyClass property
 * in the Engine object). Most developers don't need to use this since the default implementation
 * is used by default and suits most needs.
 */

/**
  * @interface
 */
ash.core.Family = function() {}

/**
 * Returns the NodeList managed by this class. This should be a reference that remains valid always
 * since it is retained and reused by Systems that use the list. i.e. never recreate the list,
 * always modify it in place.
 * @type {ash.core.NodeList}
 */
ash.core.Family.prototype.nodes = null;

/**
 * An entity has been added to the engine. It may already have components so test the entity
 * for inclusion in this family's NodeList.
 * 
 * @param {ash.core.Entity} entity that was added
 */
ash.core.Family.prototype.newEntity = function(entity) {
  throw new Error('Method must be overriden');
};

/**
 * An entity has been removed from the engine. If it's in this family's NodeList it should be removed.
 *
 * @param {ash.core.Entity} entity to remove
 */
ash.core.Family.prototype.removeEntity = function(entity) {
  throw new Error('Method must be overriden');
};

/**
 * A component has been added to an entity. Test whether the entity's inclusion in this family's
 * NodeList should be modified.
 *
 * @param {ash.core.Entity} entity with component that was added
 * @param {Object} componentClass that was added
 */
ash.core.Family.prototype.componentAddedToEntity = function(entity, componentClass) {
  throw new Error('Method must be overriden');
};

/**
 * A component has been removed from an entity. Test whether the entity's inclusion in this family's
 * NodeList should be modified.
 *
 * @param {ash.core.Entity} entity with component that was removed
 * @param {Object} componentClass that was removed
 */
ash.core.Family.prototype.componentRemovedFromEntity = function(entity, componentClass) {
  throw new Error('Method must be overriden');
};

/**
 * The family is about to be discarded. Clean up all properties as necessary. Usually, you will
 * want to empty the NodeList at this time.
 */
ash.core.Family.prototype.cleanUp = function() {
  throw new Error('Method must be overriden');
};