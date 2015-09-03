goog.provide('ash.core.Engine');

/*
 * The Engine class is the central point for creating and managing your game state. Add
 * entities and systems to the engine, and fetch families of nodes from the engine.
 */
goog.require('ash.core.EntityList');
goog.require('ash.ext.Dictionary');
goog.require('ash.core.SystemList');
goog.require('ash.signals.Signal0');
goog.require('ash.ext.Util');
goog.require('ash.core.ComponentMatchingFamily');


/**
 * @constructor
 */
ash.core.Engine = function() {
  this.update = goog.bind(this.update, this);
  this.componentRemoved = goog.bind(this.componentRemoved, this);
  this.componentAdded = goog.bind(this.componentAdded, this);
  this.entityNameChanged = goog.bind(this.entityNameChanged, this);
  this.entityList = new ash.core.EntityList();
  this.entityNames = new ash.ext.Dictionary();
  this.systemList = new ash.core.SystemList();
  this.families = new ash.ext.Dictionary();
  this.updateComplete = new ash.signals.Signal0();
}

/**
 * @type {ash.ext.Dictionary}
 */
ash.core.Engine.prototype.entityNames = null;

/**
 * @type {ash.core.EntityList}
 */
ash.core.Engine.prototype.entityList = null;

/**
 * @type {ash.core.SystemList}
 */
ash.core.Engine.prototype.systemList = null;

/**
 * @type {ash.ext.Dictionary}
 */
ash.core.Engine.prototype.families = null;

/**
 * Indicates if the engine is currently in its update loop.
 *
 * @type {boolean}
 */
ash.core.Engine.prototype.updating = false;

/**
 * Dispatched when the update loop ends. If you want to add and remove systems from the
 * engine it is usually best not to do so during the update loop. To avoid this you can
 * listen for this signal and make the change when the signal is dispatched.
 *
 * @type {ash.signals.Signal0}
 */
ash.core.Engine.prototype.updateComplete = null;

/**
 * The class used to manage node lists. In most cases the default class is sufficient
 * but it is exposed here so advanced developers can choose to create and use a
 * different implementation.
 *
 * The class must implement the IFamily interface.
 * @type {Function}
 */
ash.core.Engine.prototype.familyClass = ash.core.ComponentMatchingFamily;

/*
 * Returns a vector containing all the entities in the engine.
 */
ash.core.Engine.prototype.getEntities = function() {
  var entities, entity;
  entities = [];
  entity = this.entityList.head;
  while (entity) {
    this.entities.push(entity);
    entity = entity.next;
  }
  return entities;
};

/*
 * Returns a vector containing all the systems in the engine.
 */
ash.core.Engine.prototype.getSystems = function() {
  var system, systems;
  systems = [];
  system = this.systemList.head;
  while (system) {
    systems.push(system);
    system = system.next;
  }
  return systems;
};

/**
 * Add an entity to the engine.
 *
 * @param {ash.core.Entity} entity The entity to add.
 */
ash.core.Engine.prototype.addEntity = function(entity) {
  var each, family, _ref;
  if (this.entityNames[entity.name]) {
    throw "The entity name " + entity.name + " is already in use by another entity.";
  }
  this.entityList.add(entity);
  this.entityNames[entity.name] = entity;
  entity.componentAdded.add(this.componentAdded);
  entity.componentRemoved.add(this.componentRemoved);
  entity.nameChanged.add(this.entityNameChanged);
  _ref = this.families;
  for (each in _ref) {
    family = _ref[each];
    family.newEntity(entity);
  }
};

/**
 * Remove an entity from the engine.
 *
 * @param {ash.core.Entity} entity The entity to remove.
 */
ash.core.Engine.prototype.removeEntity = function(entity) {
  var each, family, _ref;
  entity.componentAdded.remove(this.componentAdded);
  entity.componentRemoved.remove(this.componentRemoved);
  entity.nameChanged.remove(this.entityNameChanged);
  _ref = this.families;
  for (each in _ref) {
    family = _ref[each];
    family.removeEntity(entity);
  }
  delete this.entityNames[entity.name];
  this.entityList.remove(entity);
};

/**
 * Entity Name Changed
 *
 * @param {ash.core.Entity} entity The entity that Changed
 * @param {string} name the old name
 */
ash.core.Engine.prototype.entityNameChanged = function(entity, oldName) {
  if (this.entityNames[oldName] === entity) {
    delete this.entityNames[oldName];
    this.entityNames[entity.name] = entity;
  }
};

/**
 * Get an entity based n its name.
 *
 * @param {string} name The name of the entity
 * @return {ash.core.Entity} The entity, or null if no entity with that name exists on the engine
 */
ash.core.Engine.prototype.getEntityByName = function(name) {
  return this.entityNames[name];
};

/**
 * Remove all entities from the engine.
 */
ash.core.Engine.prototype.removeAllEntities = function() {
  while (this.entityList.head !== null) {
    this.removeEntity(this.entityList.head);
  }
};

/**
 * @private
 * @param {ash.core.Entity} entity The entity that Changed
 * @param {Object} componentClass the class object
 */
ash.core.Engine.prototype.componentAdded = function(entity, componentClass) {
  var each, family, _ref;
  _ref = this.families;
  for (each in _ref) {
    family = _ref[each];
    family.componentAddedToEntity(entity, componentClass);
  }
};

/**
 * @private
 * @param {ash.core.Entity} entity The entity that Changed
 * @param {Object} componentClass the class object
 */
ash.core.Engine.prototype.componentRemoved = function(entity, componentClass) {
  var each, family, _ref;
  _ref = this.families;
  for (each in _ref) {
    family = _ref[each];
    family.componentRemovedFromEntity(entity, componentClass);
  }
};

/**
 * Get a collection of nodes from the engine, based on the type of the node required.
 *
 * <p>The engine will create the appropriate NodeList if it doesn't already exist and
 * will keep its contents up to date as entities are added to and removed from the
 * engine.</p>
 *
 * <p>If a NodeList is no longer required, release it with the releaseNodeList method.</p>
 *
 * @param {Object} nodeClass The type of node required.
 * @return {ash.core.NodeList} A linked list of all nodes of this type from all entities in the engine.
 */
ash.core.Engine.prototype.getNodeList = function(nodeClass) {
  var entity, family;
  if (ash.ext.Util.getClassName(nodeClass) in this.families) {
    return this.families[ash.ext.Util.getClassName(nodeClass)].nodes;
  }
  family = new this.familyClass(nodeClass, this);
  this.families[ash.ext.Util.getClassName(nodeClass)] = family;
  entity = this.entityList.head;
  while (entity) {
    family.newEntity(entity);
    entity = entity.next;
  }
  return family.nodes;
};

/**
 * If a NodeList is no longer required, this method will stop the engine updating
 * the list and will release all references to the list within the framework
 * classes, enabling it to be garbage collected.
 *
 * <p>It is not essential to release a list, but releasing it will free
 * up memory and processor resources.</p>
 *
 * @param {Object} nodeClass The type of the node class if the list to be released.
 */
ash.core.Engine.prototype.releaseNodeList = function(nodeClass) {
  if (ash.ext.Util.getClassName(nodeClass) in this.families) {
    this.families[ash.ext.Util.getClassName(nodeClass)].cleanUp();
    delete this.families[ash.ext.Util.getClassName(nodeClass)];
  }
};

/**
 * Add a system to the engine, and set its priority for the order in which the
 * systems are updated by the engine update loop.
 *
 * <p>The priority dictates the order in which the systems are updated by the engine update
 * loop. Lower numbers for priority are updated first. i.e. a priority of 1 is
 * updated before a priority of 2.</p>
 *
 * @param {ash.core.System} system The system to add to the engine.
 * @param {number} priority The priority for updating the systems during the engine loop. A
 * lower number means the system is updated sooner.
 */
ash.core.Engine.prototype.addSystem = function(system, priority) {
  system.priority = priority;
  system.addToEngine(this);
  this.systemList.add(system);
};

/**
 * Get the system instance of a particular type from within the engine.
 *
 * @param {Object} type The type of system
 * @return {ash.core.System} The instance of the system type that is in the engine, or
 * null if no systems of this type are in the engine.
 */
ash.core.Engine.prototype.getSystem = function(type) {
  return this.systemList.get(type);
};

/**
 * Remove a system from the engine.
 *
 * @param {ash.core.System} system The system to remove from the engine.
 */
ash.core.Engine.prototype.removeSystem = function(system) {
  this.systemList.remove(system);
  system.removeFromEngine(this);
};

/**
 * Remove all systems from the engine.
 */
ash.core.Engine.prototype.removeAllSystems = function() {
  while (this.systemList.head !== null) {
    this.removeSystem(this.systemList.head);
  }
};

/**
 * Update the engine. This causes the engine update loop to run, calling update on all the
 * systems in the engine.
 *
 * <p>The package ash.tick contains classes that can be used to provide
 * a steady or variable tick that calls this update method.</p>
 *
 * @time {number} The duration, in seconds, of this update step.
 */
ash.core.Engine.prototype.update = function(time) {
  var system;
  this.updating = true;
  system = this.systemList.head;
  while (system) {
    system.update(time);
    system = system.next;
  }
  this.updating = false;
  this.updateComplete.dispatch();
};