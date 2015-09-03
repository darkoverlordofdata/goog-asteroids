goog.provide('ash.fsm.EntityStateMachine');

/*
 * This is a state machine for an entity. The state machine manages a set of states,
 * each of which has a set of component providers. When the state machine changes the state, it removes
 * components associated with the previous state and adds components associated with the new state.
 */
goog.require('ash.ext.Dictionary');
goog.require('ash.fsm.EntityState');


/**
 * Creates an EntityStateMachine.
 * @constructor 
 * @param {ash.core.Entity}
 */
ash.fsm.EntityStateMachine = function(_at_entity) {
  this.entity = _at_entity;
  this.states = new ash.ext.Dictionary();
}

/**
 * @type {ash.ext.Dictionary}
 */
ash.fsm.EntityStateMachine.prototype.states = null;

/**
	 * The current state of the state machine.
 * @type {ash.fsm.EntityState}
 */
ash.fsm.EntityStateMachine.prototype.currentState = null;

/*
 * The entity whose state machine this is
 * @type {ash.core.Entity}
 */
ash.fsm.EntityStateMachine.prototype.entity = null;

/**
		 * Add a state to this state machine.
		 *
		 * @param {string} name The name of this state - used to identify it later in the changeState method call.
		 * @param {ash.core.Entity} state The state.
		 * @return {ash.fsm.EntityStateMachine} This state machine, so methods can be chained.
 */
ash.fsm.EntityStateMachine.prototype.addState = function(name, state) {
  this.states[name] = state;
  return this;
};

/**
 * Create a new state in this state machine.
 *
 * @param {string} name The name of the new state - used to identify it later in the changeState method call.
 * @return {ash.fsm.EntityState} The new ash.fsm.EntityState object that is the state. This will need to be configured with
 * the appropriate component providers.
 */
ash.fsm.EntityStateMachine.prototype.createState = function(name) {
  var state;
  state = new ash.fsm.EntityState();
  this.states[name] = state;
  return state;
};

/**
 * Change to a new state. The components from the old state will be removed and the components
 * for the new state will be added.
 *
 * @param {string} name The name of the state to change to.
 */
ash.fsm.EntityStateMachine.prototype.changeState = function(name) {
  var newState, other, toAdd, type;
  newState = this.states[name];
  if (!newState) {
    throw new Error("Entity state " + name + " doesn't exist");
  }
  if (newState === this.currentState) {
    newState = null;
    return;
  }
  if (this.currentState) {
    toAdd = new ash.ext.Dictionary();
    for (type in newState.providers) {
      toAdd[type] = newState.providers[type];
    }
    for (type in this.currentState.providers) {
      other = toAdd[type];
      if (other && other.getIdentifier() === this.currentState.providers[type].getIdentifier()) {
        delete toAdd[type];
      } else {
        this.entity.remove(type);
      }
    }
  } else {
    toAdd = newState.providers;
  }
  for (type in toAdd) {
    this.entity.add(toAdd[type].getComponent());
  }
  return this.currentState = newState;
};