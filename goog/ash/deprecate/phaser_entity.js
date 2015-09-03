goog.provide('ash.deprecate.PhaserEntity');

/*
  After reading http://www.paolodistefano.com/2015/01/18/ecs2/,
  I tried making entity inherit from Sprite. Turns out this can't work.
  Sprite already has a component collection named components.

  While we could re-implement ash so that there are no named collisions when merging into
  Sprite, the whole super object approach is a bad idea, and why we are using ecs in the
  first place ;)

  Sprite should be a component of an entity, just like everything else
 */

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

if (typeof Phaser !== "undefined" && Phaser !== null) {
  ash.ext.PhaserEntity = function(game, key, name) {
    if (name == null) {
      name = '';
    }
    ash.ext.PhaserEntity.superClass_.constructor.call(this, game, 0, 0, key);
    Object.defineProperties(this, {
      
/*
       * All entities have a name. If no name is set, a default name is used. Names are used to
       * fetch specific entities from the engine, and can also help to identify an entity when debugging.
       */
      name: {
        get: function() {
          return this._name;
        },
        set: function(value) {
          var previous;
          if (this._name !== value) {
            previous = this._name;
            this._name = value;
            return this.nameChanged.dispatch(this, previous);
          }
        }
      }
    });
    this.componentAdded = new Signal2();
    this.componentRemoved = new Signal2();
    this.nameChanged = new Signal2();
    this.components = new Dictionary();
    if (name !== '') {
      this._name = name;
    } else {
      this._name = "_entity" + (++nameCount);
    }
  }
  var nameCount;
  goog.inherits(ash.ext.PhaserEntity, Phaser.Sprite);
  nameCount = 0;
  
/*
   * Optional, give the entity a name. This can help with debugging and with serialising the entity.
   */
  ash.ext.PhaserEntity.prototype._name = '';
  
/*
   * This signal is dispatched when a component is added to the entity.
   */
  ash.ext.PhaserEntity.prototype.componentAdded = null;
  
/*
   * This signal is dispatched when a component is removed from the entity.
   */
  ash.ext.PhaserEntity.prototype.componentRemoved = null;
  
/*
   * Dispatched when the name of the entity changes. Used internally by the engine to track entities based on their names.
   */
  ash.ext.PhaserEntity.prototype.nameChanged = null;
  ash.ext.PhaserEntity.prototype.previous = null;
  ash.ext.PhaserEntity.prototype.next = null;
  ash.ext.PhaserEntity.prototype.components = null;
  
/*
   * Add a component to the entity.
   *
   * @param component The component object to add.
   * @param componentClass The class of the component. This is only necessary if the component
   * extends another component class and you want the framework to treat the component as of
   * the base class type. If not set, the class type is determined directly from the component.
   *
   * @return A reference to the entity. This enables the chaining of calls to add, to make
   * creating and configuring entities cleaner. e.g.
   *
   * <code>var entity:Entity = new Entity()
   *     .add(new Position(100, 200)
   *     .add(new Display(new PlayerClip());</code>
   */
  ash.ext.PhaserEntity.prototype.add = function(component, componentClass) {
    if (componentClass == null) {
      componentClass = component.constructor;
    }
    if (componentClass.className in this.components) {
      this.remove(componentClass);
    }
    this.components[componentClass.className] = component;
    this.componentAdded.dispatch(this, componentClass);
    return this;
  };
  
/*
   * Remove a component from the entity.
   *
   * @param componentClass The class of the component to be removed.
   * @return the component, or null if the component doesn't exist in the entity
   */
  ash.ext.PhaserEntity.prototype.remove = function(componentClass) {
    var component, name;
    name = componentClass.className != null ? componentClass.className : componentClass;
    component = this.components[name];
    if (component) {
      delete this.components[name];
      this.componentRemoved.dispatch(this, name);
      return component;
    }
    return null;
  };
  
/*
   * Get a component from the entity.
   *
   * @param componentClass The class of the component requested.
   * @return The component, or null if none was found.
   */
  ash.ext.PhaserEntity.prototype.get = function(componentClass) {
    return this.components[componentClass.className];
  };
  
/*
   * Get all components from the entity.
   *
   * @return An array containing all the components that are on the entity.
   */
  ash.ext.PhaserEntity.prototype.getAll = function() {
    var component, componentArray, _i, _len, _ref;
    componentArray = [];
    _ref = this.components;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      component = _ref[_i];
      componentArray.push(component);
    }
    return componentArray;
  };
  
/*
   * Does the entity have a component of a particular type.
   *
   * @param componentClass The class of the component sought.
   * @return true if the entity has a component of the type, false if not.
   */
  ash.ext.PhaserEntity.prototype.has = function(componentClass) {
    return componentClass.className in this.components;
  };
}