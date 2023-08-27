import { useSyncExternalStore } from "use-sync-external-store/shim";

class GlobalData<Data> {
  private listeners: Set<Function> = new Set();
  constructor(private state: Data) {
    //
  }

  getData() {
    return Object.freeze(this.state);
  }

  setData(state: Data) {
    this.state = state;
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: Function) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

function useGlobalData<State>(globalState: GlobalData<State>) {
  return useSyncExternalStore<State>(
    globalState.subscribe,
    globalState.getData
  );
}

export { GlobalData, useGlobalData };
