function Machine(config) {
  return new StateNode(config)
}

class StateNode {
  constructor(config, machine, value) {
    this.config = config
    this.initial = config.initial
    this.value = value || this.initial
    this.machine = machine || this
    this.context = config.context || this.machine.context
    this.on = config.on
    const states = {}
    if (config.states) {
      for (let key in config.state) {
        states[key] = new StateNode(config.states[key], this.machine, key)
      }
    }
    this.states = states
  }

  next(event) {
    const { type } = event
    const nextState = this.on[type];
    if (typeof nextState === 'string') {
      return this.getStateNode(nextState);
    }
    const actions = nextState.actions;
    if (Array.isArray(actions)) {
      const context = this.context;
      const newContext = {};
      actions.forEach(action => {
        const assignment = action.assignment;
        for (let key in assignment) {
          if (typeof assignment[key] === 'function') {
            newContext[key] = assignment[key](context);
          } else {
            newContext[key] = assignment[key];
          }
        }
      })
      Object.assign(context, newContext)
    }
    return this;
  }

  getStateNode(stateKey) {
    return this.machine.states[stateKey]
  }
}

export default Machine;
