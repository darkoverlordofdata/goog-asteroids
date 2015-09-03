goog.provide('ash.tools.ComponentPool');

goog.require('goog.array');
/*
 * An object pool for re-using components. This is not integrated in to Ash but is used dierectly by
 * the developer. It expects components to not require any parameters in their constructor.
 *
 * <p>Fetch an object from the pool with</p>
 *
 * <p>ComponentPool.get( ComponentClass );</p>
 *
 * <p>If the pool contains an object of the required type, it will be returned. If it does not, a new object
 * will be created and returned.</p>
 *
 * <p>The object returned may have properties set on it from the time it was previously used, so all properties
 * should be reset in the object once it is received.</p>
 *
 * <p>Add an object to the pool with</p>
 *
 * <p>ComponentPool.dispose( component );</p>
 *
 * <p>You will usually want to do this when removing a component from an entity. The remove method on the entity
 * returns the component that was removed, so this can be done in one line of code like this</p>
 *
 * <p>ComponentPool.dispose( entity.remove( component ) );</p>
 */
goog.require('ash.ext.Dictionary');


/**
 * constructor
 */
ash.tools.ComponentPool = function() {}

/**
 * @type {ash.core.Dictionary}
 */
var getPool, pools;
pools = new ash.ext.Dictionary();

/**
 * @param {Function} componentClass
 * @return {ash.core.Dictionary}
 */
getPool = function(componentClass) {
  var _ref;
  if ((_ref = componentClass.className, goog.array.indexOf(pools, _ref) >= 0)) {
    return pools[componentClass.className];
  } else {
    return pools[componentClass.className] = [];
  }
};

/**
 * Get an object from the pool.
 *
 * @param {Function} componentClass The type of component wanted.
 * @return {Object} The component.
 */
ash.tools.ComponentPool.get = function(componentClass) {
  var pool;
  pool = getPool(componentClass);
  if (pool.length > 0) {
    return pool.pop();
  } else {
    return new componentClass();
  }
};

/**
 * Return an object to the pool for reuse.
 *
 * @param {Object} component The component to return to the pool.
 */
ash.tools.ComponentPool.dispose = function(component) {
  var pool, type;
  if (component) {
    type = component.constructor;
    pool = getPool(type);
    pool.push(component);
  }
};

/**
 * Dispose of all pooled resources, freeing them for garbage collection.
 */
ash.tools.ComponentPool.empty = function() {
  return pools = new ash.ext.Dictionary();
};