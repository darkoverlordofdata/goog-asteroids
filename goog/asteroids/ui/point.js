goog.provide('asteroids.ui.Point');

/**
 * @constructor
 * @param {number}
 * @param {number}
 */
asteroids.ui.Point = function(_at_x, _at_y) {
  this.x = _at_x != null ? _at_x : 0;
  this.y = _at_y != null ? _at_y : 0;
}

/** @type {number} */
asteroids.ui.Point.prototype.x = 0;

/** @type {number} */
asteroids.ui.Point.prototype.y = 0;

/**
 * @param {asteroids.ui.Point}
 * @param {asteroids.ui.Point}
 */
asteroids.ui.Point.distance = function(point1, point2) {
  var dx, dy;
  dx = point1.x - point2.x;
  dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * @param {asteroids.ui.Point}
 @ return {number}
 */
asteroids.ui.Point.prototype.distanceSquaredTo = function(targetPoint) {
  var dx, dy;
  dx = this.x - targetPoint.x;
  dy = this.y - targetPoint.y;
  return dx * dx + dy * dy;
};

/**
 * @param {asteroids.ui.Point}
 @ return {number}
 */
asteroids.ui.Point.prototype.distanceTo = function(targetPoint) {
  var dx, dy;
  dx = this.x - targetPoint.x;
  dy = this.y - targetPoint.y;
  return Math.sqrt(dx * dx + dy * dy);
};