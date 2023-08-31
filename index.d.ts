declare class GlobalData<Data> {
  private listeners;
  private data;
  constructor(data: Data);
  getData(): Readonly<Data>;
  setData(state: Data): void;
  subscribe(listener: Function): () => boolean;
}
declare function useGlobalData<State>(
  globalData: GlobalData<State>
): [Readonly<State>, (state: State) => void];
export { GlobalData, useGlobalData };
//# sourceMappingURL=index.d.ts.map
