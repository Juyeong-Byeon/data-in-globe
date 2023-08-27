class GlobalState<State> {
  private listeners: Set<Function> = new Set();
  constructor(private state: State) {
    //
  }

  getState() {
    return Object.freeze(this.state);
  }

  setState(state: State) {
    this.state = state;
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: Function) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export { GlobalState };
