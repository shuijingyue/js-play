function Machine(config) {
  return new StateNode(config)
}

class StateNode {
  constructor(config, machine, value) {
    this.config = config
    this.initial = config.initial
    this.value = value || this.initial
    this.machine = machine || this
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
    return this.getStateNode(nextState);
  }

  getStateNode(stateKey) {
    return this.machine.states[stateKey]
  }
}

export default Machine;
