goog.provide('asteroids.ui.Container');

asteroids.ui.Container = function(_at_graphic) {
  this.graphic = _at_graphic;
  this.children = [];
}
asteroids.ui.Container.prototype.graphic = null;
asteroids.ui.Container.prototype.children = null;
asteroids.ui.Container.prototype.addChild = function(child) {
  return this.children.push(child);
};
asteroids.ui.Container.prototype.draw = function() {
  var child, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = children.length; _i < _len; _i++) {
    child = children[_i];
    _results.push(child.draw());
  }
  return _results;
};