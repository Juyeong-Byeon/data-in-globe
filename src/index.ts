class GlobalState<State> {
  constructor(private state: State) {
    //
  }

  getState() {
    return Object.freeze(this.state);
  }

  setState(state: State) {
    this.state = state;
  }
}

export { GlobalState };
