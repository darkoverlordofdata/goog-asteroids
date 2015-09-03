goog.provide('ash.core.EntityList');

/*
 * An internal class for a linked list of entities. Used inside the framework for
 * managing the entities.
 */

/**
 * @constructor
 */
ash.core.EntityList = function() {}

/**
 * @type {ash.core.Entity}
 */
ash.core.EntityList.prototype.head = null;

/**
 * @type {ash.core.Entity}
 */
ash.core.EntityList.prototype.tail = null;

/**
 * Add an entity to the list
 *
 * @param {ash.core.Entity}
 */
ash.core.EntityList.prototype.add = function(entity) {
  if (!this.head) {
    this.head = this.tail = entity;
    entity.next = entity.previous = null;
  } else {
    this.tail.next = entity;
    entity.previous = this.tail;
    entity.next = null;
    this.tail = entity;
  }
};

/**
 * Remove an entity from the list
 *
 * @param {ash.core.Entity}
 */
ash.core.EntityList.prototype.remove = function(entity) {
  if (this.head === entity) {
    this.head = this.head.next;
  }
  if (this.tail === entity) {
    this.tail = this.tail.previous;
  }
  if (entity.previous) {
    entity.previous.next = entity.next;
  }
  if (entity.next) {
    entity.next.previous = entity.previous;
  }
};

/**
 * Remove all entities
 */
ash.core.EntityList.prototype.removeAll = function() {
  var entity;
  while (this.head) {
    entity = this.head;
    this.head = this.head.next;
    entity.previous = null;
    entity.next = null;
  }
  this.tail = null;
};