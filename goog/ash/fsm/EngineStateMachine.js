goog.provide('ash.fsm.EngineStateMachine');

/*
 * This is a state machine for the Engine. The state machine manages a set of states,
 * each of which has a set of System providers. When the state machine changes the state, it removes
 * Systems associated with the previous state and adds Systems associated with the new state.
 */
goog.require('ash.ext.Dictionary');
goog.require('ash.fsm.EngineState');


/**
 * Creates an SystemStateMachine.
 * @constructor 
 * @param {ash.core.Engine} engine
 */
ash.fsm.EngineStateMachine = function(_at_engine) {
  this.engine = _at_engine;
  this.states = new ash.ext.Dictionary();
}

/**
 * @type {ash.core.Engine}
 */
ash.fsm.EngineStateMachine.prototype.engine = null;

/**
 * @type {ash.ext.Dictionary}
 */
ash.fsm.EngineStateMachine.prototype.states = null;

/**
 * @type {ash.fsm.EngineState}
 */
ash.fsm.EngineStateMachine.prototype.currentState = null;

/**
 * Add a state to this state machine.
 *
 * @param {string} name The name of this state - used to identify it later in the changeState method call.
 * @param {ash.fsm.EngineState} state The state.
 * @return {ash.fsm.EngineStateMachine} This state machine, so methods can be chained.
 */
ash.fsm.EngineStateMachine.prototype.addState = function(name, state) {
  this.states[name] = state;
  return this;
};

/**
 * Create a new state in this state machine.
 *
 * @param {string} name The name of the new state - used to identify it later in the changeState method call.
 * @return {ash.fsm.EngineState} The new EntityState object that is the state. This will need to be configured with
 * the appropriate component providers.
 */
ash.fsm.EngineStateMachine.prototype.createState = function(name) {
  var state;
  state = new ash.fsm.EngineState();
  this.states[name] = state;
  return this;
};

/**
 * Change to a new state. The Systems from the old state will be removed and the Systems
 * for the new state will be added.
 *
 * @param {string} name The name of the state to change to.
 */
ash.fsm.EngineStateMachine.prototype.changeState = function(name) {
  var each, id, newState, other, provider, toAdd, _ref, _ref1;
  newState = this.states[name];
  if (newState == null) {
    throw new Error("Engine state " + name + " doesn't exist");
  }
  if (newState === this.currentState) {
    newState = null;
    return;
  }
  toAdd = new ash.ext.Dictionary();
  _ref = newState.providers;
  for (each in _ref) {
    provider = _ref[each];
    id = provider.getIdentifier();
    toAdd[id] = provider;
  }
  if (currentState) {
    _ref1 = this.currentState.providers;
    for (each in _ref1) {
      provider = _ref1[each];
      id = provider.getIdentifier();
      other = toAdd[id];
      if (other) {
        delete toAdd[id];
      } else {
        this.engine.removeSystem(provider.getSystem());
      }
    }
  }
  for (each in toAdd) {
    provider = toAdd[each];
    this.engine.addSystem(provider.getSystem(), provider.priority);
  }
  return this.currentState = newState;
};