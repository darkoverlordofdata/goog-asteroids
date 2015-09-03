goog.provide('asteroids.ui.Shape');
goog.require('asteroids.ui.Container');
asteroids.ui.Shape = function() {
  return asteroids.ui.Shape.superClass_.constructor.apply(this, arguments);
}
goog.inherits(asteroids.ui.Shape, asteroids.ui.Container);