goog.provide('asteroids.Main');

goog.require('asteroids.Asteroids');


/**
 * Create a new game
 * @constructor
 */
asteroids.Main = function() {
  var canvas;
  canvas = this.canvas();
  new asteroids.Asteroids(canvas.getContext('2d'), canvas.width, canvas.height).start();
  return;
}

/**
 * Create the canvas
 * @return {HTMLCanvasElement}
 */
asteroids.Main.prototype.canvas = function() {
  var canvas;
  canvas = document.createElement(navigator.isCocoonJS ? 'screencanvas' : 'canvas');
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.backgroundColor = '#000000';
  document.body.appendChild(canvas);
  return canvas;
};