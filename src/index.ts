import { useCallback } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import cloneDeep from "lodash/cloneDeep";

class GlobalData<Data> {
  private listeners: Set<Function> = new Set();
  private data: Readonly<Data>;
  constructor(data: Data) {
    this.data = Object.freeze(cloneDeep(data));
  }

  getData() {
    return this.data;
  }

  setData(state: Data) {
    this.data = Object.freeze(cloneDeep(state));
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: Function) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

function useGlobalData<State>(
  globalData: GlobalData<State>
): [Readonly<State>, (state: State) => void] {
  const data = useSyncExternalStore(globalData.subscribe, globalData.getData);
  const setData = useCallback(globalData.setData.bind(globalData), [
    globalData,
  ]);

  return [data, setData];
}

export { GlobalData, useGlobalData };
