goog.provide('asteroids.systems.SystemPriorities');

asteroids.systems.SystemPriorities = function() {}
asteroids.systems.SystemPriorities.preUpdate = 1;
asteroids.systems.SystemPriorities.update = 2;
asteroids.systems.SystemPriorities.move = 3;
asteroids.systems.SystemPriorities.resolveCollisions = 4;
asteroids.systems.SystemPriorities.stateMachines = 5;
asteroids.systems.SystemPriorities.animate = 6;
asteroids.systems.SystemPriorities.render = 7;