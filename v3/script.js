// Define the store
function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  return {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    },
    subscribe(listener) {
      listeners.push(listener);
      return function unsubscribe() {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
  };
}

// Define actions
function createAction(type, payload) {
  return { type, payload };
}

// Define reducers
function combineReducers(reducers) {
  return function (state = {}, action) {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
}

function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// Define middleware
function loggerMiddleware(store) {
  return function (next) {
    return function (action) {
      console.log('dispatching', action);
      let result = next(action);
      console.log('next state', store.getState());
      return result;
    };
  };
}

// Define subscriptions
function logSubscription(store) {
  return function () {
    console.log('state changed', store.getState());
  };
}

// Create the store
const rootReducer = combineReducers({ counter: counterReducer });
const store = createStore(rootReducer, { counter: 0 });

// Register middleware and subscriptions
store.subscribe(logSubscription(store));
const logger = loggerMiddleware(store);
const dispatch = logger(store.dispatch);

// Dispatch some actions
dispatch(createAction('INCREMENT'));
dispatch(createAction('INCREMENT'));
dispatch(createAction('DECREMENT'));

// stop listening to state updates
const unsubscribe = store.subscribe(() => {
  console.log('state changed', store.getState());
});
unsubscribe();
