import { useCallback } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import cloneDeep from "lodash/cloneDeep";
import { produce } from "immer";

class GlobalData<Data> {
  private listeners: Set<Function>;
  private data: Readonly<Data>;

  constructor(data: Data) {
    this.listeners = new Set();
    this.data = Object.freeze(cloneDeep(data));
  }

  getData() {
    return this.data;
  }

  setData(state: Data) {
    this.data = Object.freeze(cloneDeep(state));
    this.notify();
  }

  updateData(updater: (state: Data) => Data) {
    this.data = Object.freeze(produce(this.data, updater));
    this.notify();
  }

  subscribe(listener: Function) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }
}

function useGlobalData<State>(
  globalData: GlobalData<State>
): [
  Readonly<State>,
  (state: State) => void,
  (updater: (state: State) => State) => void
] {
  const data = useSyncExternalStore<State>(
    useCallback(globalData.subscribe.bind(globalData), [globalData]),
    useCallback(globalData.getData.bind(globalData), [globalData])
  );
  const setData = useCallback(globalData.setData.bind(globalData), [
    globalData,
  ]);

  const updateData = useCallback(globalData.updateData.bind(globalData), [
    globalData,
  ]);

  return [data, setData, updateData];
}

export { GlobalData, useGlobalData };
