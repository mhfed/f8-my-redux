// Define the initial state

const initialState = {
  count: 0,
};

// Define the reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

// Create the store
const store = {
  state: initialState,
  listeners: [],
  getState() {
    return this.state;
  },
  dispatch(action) {
    this.state = reducer(this.state, action);
    this.listeners.forEach((listener) => listener());
  },
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  },
};

//Subscribe to the store
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// Dispatch some actions
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });

// Stop listening to state updates
unsubscribe();
