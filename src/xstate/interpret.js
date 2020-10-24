function interpret(machine) {
  return new Interpret(machine)
}

const InterpretStatus = {
  NotStarted: 0,
  Running: 1,
  Stopped: 2
}

class Interpret {
  constructor(machine) {
    this.machine = machine;
    this.listeners = new Set();
    this.status = InterpretStatus.NotStarted;
    this.state = machine.states[machine.initial];
  }

  start() {
    this.status = InterpretStatus.Running;
    return this;
  }

  send(event) {
    this.state = this.state.next(event);
    this.listeners.forEach(listener => {
      listener(this.state);
    });
  }

  onTransition(listener) {
    this.listeners.add(listener);
    return this;
  }
}

export default interpret;
