goog.provide('ash.core.Entity');

/*
 * An entity is composed from components. As such, it is essentially a collection object for components.
 * Sometimes, the entities in a game will mirror the actual characters and objects in the game, but this
 * is not necessary.
 *
 * <p>Components are simple value objects that contain data relevant to the entity. Entities
 * with similar functionality will have instances of the same components. So we might have
 * a position component</p>
 *
 * <p><code>class PositionComponent
 * {
 *   public var x:Float;
 *   public var y:Float;
 * }</code></p>
 *
 * <p>All entities that have a position in the game world, will have an instance of the
 * position component. Systems operate on entities based on the components they have.</p>
 */
goog.require('ash.signals.Signal2');
goog.require('ash.ext.Dictionary');
goog.require('ash.ext.Util');


/**
 * @constructor
 * @param {string} name Entity name
 */
ash.core.Entity = function(name) {
  if (name == null) {
    name = '';
  }
  this.componentAdded = new ash.signals.Signal2();
  this.componentRemoved = new ash.signals.Signal2();
  this.nameChanged = new ash.signals.Signal2();
  this.components = new ash.ext.Dictionary();
  if (name !== '') {
    if (ash.core.Entity.nameCount[name] == null) {
      ash.core.Entity.nameCount[name] = 0;
    }
    this.name = name + (++ash.core.Entity.nameCount[name]);
  } else {
    this.name = "_entity" + (++nameCount);
  }
}
var nameCount;
ash.core.Entity.nameCount = {};
nameCount = 0;

/**
 * Optional, give the entity a name. This can help with debugging and with serialising the entity.
 *
 * @type {string}
 */
ash.core.Entity.prototype.name = '';

/**
 * This signal is dispatched when a component is added to the entity.
 * 
 * @type {ash.signals.Signal2}
 */
ash.core.Entity.prototype.componentAdded = null;

/**
 * This signal is dispatched when a component is removed from the entity.
 * 
 * @type {ash.signals.Signal2}
 */
ash.core.Entity.prototype.componentRemoved = null;

/**
 * Dispatched when the name of the entity changes. Used internally by the engine to track entities based on their names.
 * 
 * @type {ash.signals.Signal2}
 */
ash.core.Entity.prototype.nameChanged = null;
ash.core.Entity.prototype.previous = null;
ash.core.Entity.prototype.next = null;
ash.core.Entity.prototype.components = null;

/**
 * All entities have a name. If no name is set, a default name is used. Names are used to
 * fetch specific entities from the engine, and can also help to identify an entity when debugging.
 * @param {string} value
 */
ash.core.Entity.prototype.setName = function(value) {
  var previous;
  if (this.name !== value) {
    previous = this.name;
    this.name = value;
    this.nameChanged.dispatch(this, previous);
  }
};

/**
 * Add a component to the entity.
 *
 * @param {Object} component The component object to add.
 * @param {Object} componentClass The class of the component. This is only necessary if the component
 * extends another component class and you want the framework to treat the component as of
 * the base class type. If not set, the class type is determined directly from the component.
 *
 * @return {ash.core.Entity} A reference to the entity. This enables the chaining of calls to add, to make
 * creating and configuring entities cleaner. e.g.
 *
 * <code>var entity:Entity = new Entity()
 *     .add(new Position(100, 200)
 *     .add(new Display(new PlayerClip());</code>
 */
ash.core.Entity.prototype.add = function(component, componentClass) {
  if (componentClass == null) {
    componentClass = component.constructor;
  }
  if (ash.ext.Util.getClassName(componentClass) in this.components) {
    this.remove(componentClass);
  }
  this.components[ash.ext.Util.getClassName(componentClass)] = component;
  this.componentAdded.dispatch(this, componentClass);
  return this;
};

/**
 * Remove a component from the entity.
 *
 * @param {Object} componentClass The class of the component to be removed.
 * @return {Object} the component, or null if the component doesn't exist in the entity
 */
ash.core.Entity.prototype.remove = function(componentClass) {
  var component, name;
  name = ash.ext.Util.getClassName(componentClass) != null ? ash.ext.Util.getClassName(componentClass) : componentClass;
  component = this.components[name];
  if (component) {
    delete this.components[name];
    this.componentRemoved.dispatch(this, name);
    return component;
  }
  return null;
};

/**
 * Get a component from the entity.
 *
 * @param {Object} componentClass The class of the component requested.
 * @return {Object} The component, or null if none was found.
 */
ash.core.Entity.prototype.get = function(componentClass) {
  return this.components[ash.ext.Util.getClassName(componentClass)];
};

/**
 * Get all components from the entity.
 *
 * @return {Array<Object>} An array containing all the components that are on the entity.
 */
ash.core.Entity.prototype.getAll = function() {
  var component, componentArray, _i, _len, _ref;
  componentArray = [];
  _ref = this.components;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    component = _ref[_i];
    componentArray.push(component);
  }
  return componentArray;
};

/**
 * Does the entity have a component of a particular type.
 *
 * @param {Object} componentClass The class of the component sought.
 * @return {boolean} true if the entity has a component of the type, false if not.
 */
ash.core.Entity.prototype.has = function(componentClass) {
  return ash.ext.Util.getClassName(componentClass) in this.components;
};