goog.provide('ash.ext.Util');

/**
 * @constructor
 */
ash.ext.Util = function() {}

/**
	 * Get Class Name
	 *
	 * closure compiler changes the class name, or sets it to ''
	 * In that case, add a static className property to all
	 * Nodes and Components so they can be identified.
	 *
	 * @param {Function} klass
	 * @return {string}
 */
ash.ext.Util.getClassName = function(klass) {
  var _ref;
  return (_ref = klass.className) != null ? _ref : klass.name;
};