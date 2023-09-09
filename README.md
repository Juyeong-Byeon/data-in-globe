# `data-in-globe` - Javascript State Management Library

`data-in-globe` is an open-source javascript library for managing global state in React applications. It provides a simple and efficient way to share and manage application state across components.

## Installation

You can install `data-in-globe` via npm or yarn:

```bash
npm install data-in-globe
# or
yarn add data-in-globe
```

## Basic usage

declare your global data
```ts
// src/globalStore
import { GlobalData } from "data-in-globe";

export const globalCounter = new GlobalData({ count: 1 });
```
import and use your global data with useGlobalData

```tsx
// src/App.tsx
import { GlobalData, useGlobalData } from "data-in-globe";
import { globalCounter } from './globalStore'



function App() {

const [data, setData, updateData] = useGlobalData(globalCounter);

  const onIncreaseClicked = () => {
    setData({
      count: data.count + 1,
    });
  };

  const onDecreaseClick = () => {
    updateData((state)=>{
      // can update in mutable style
     state.count++
     return state;
    });
  };

  return (
    <div className="App">
      <button onClick={onIncreaseClicked}>increase</button>
      <button onClick={onDecreaseClick}>decrease</button>
      {data?.count}
    </div>
  );
}
```


## API

### `GlobalData<Data>`

`GlobalData` is a class that represents a global data store. It allows you to create and manage a global state object.

#### Constructor

- `new GlobalData<Data>(data: Data): GlobalData<Data>`

   Initializes a new `GlobalData` instance with an initial data object. The `data` parameter is the initial state that you want to manage globally.

#### Methods

- `getData(): Readonly<Data>`

   Returns a readonly reference to the current global state data.

- `setData(state: Data): void`

   Sets the global state data to the provided `state`. This method triggers all subscribed listeners.

- `updateData(updater: (state: Data) => Data): void`

   Updates the global state data using an updater function. The updater function receives the current state as an argument and should return the new state. This method leverages Immer for immutability and triggers all subscribed listeners.

- `subscribe(listener: Function): () => void`

   Subscribes a listener function to changes in the global state. Returns a function that can be used to unsubscribe the listener.

### `useGlobalData<State>(globalData: GlobalData<State>): [Readonly<State>, (state: State) => void, (updater: (state: State) => State) => void]`

`useGlobalData` is a custom React hook that allows components to interact with a `GlobalData` instance.

#### Parameters

- `globalData: GlobalData<State>`

   A `GlobalData` instance that you want to use within your component.

#### Return Value

- `[Readonly<State>, (state: State) => void, (updater: (state: State) => State) => void]`

   Returns an array containing three elements:
   
   - `Readonly<State>`: A readonly reference to the current global state data.
   
   - `(state: State) => void`: A function that allows you to set the global state data to the provided `state`.
   
   - `(updater: (state: State) => State) => void`: A function that allows you to update the global state data using an updater function.

## Example

Here's an example of how to use `data-in-globe` in a React component:

```tsx
import React from "react";
import { GlobalData, useGlobalData } from "data-in-globe";

// Create a global data store
const globalState = new GlobalData({ count: 0 });

function App() {
  // Use the global state within a component
  const [data, setData, updateData] = useGlobalData(globalState);

  const increment = () => {
    updateData((state) => {
      state.count++
      return state;
    });
  };

  return (
    <div>
      <p>Count: {data.count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default App;
```

In this example, we create a global data store using `GlobalData`, and then we use the `useGlobalData` hook to access and update the global state within the `App` component.

This documentation covers the core API of the `data-in-globe` library. You can use it to manage and share global state in your React applications efficiently.
