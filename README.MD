# Redux.js

This file contains the implementation of Redux, a predictable state container for JavaScript apps.

## createStore

`createStore(reducer, initialState)` is a function that creates a Redux store that holds the complete state tree of your app. There should only be a single store in your app.

### Parameters

- `reducer` (Function): A reducing function that returns the next state tree, given the current state tree and an action to handle.
- `initialState` (Object): The initial state of the store.

### Returns

An object that holds the complete state of your app.

## createAction

`createAction(type, payload)` is a function that creates an action object with a type and payload.

### Parameters

- `type` (string): The type of the action.
- `payload` (any): The payload of the action.

### Returns

An action object.

## combineReducers

`combineReducers(reducers)` is a function that combines multiple reducers into a single reducer function.

### Parameters

- `reducers` (Object): An object whose values correspond to different reducer functions.

### Returns

A reducer function that calls each reducer with the slice of state corresponding to its key, and combines the results into a single state object.

## counterReducer

`counterReducer(state, action)` is a reducer function that handles state changes for the counter slice of the state.

### Parameters

- `state` (number): The current state of the counter slice.
- `action` (Object): An action object that describes the change to be made to the state.

### Returns

The new state of the counter slice.

## loggerMiddleware

`loggerMiddleware(store)` is a middleware function that logs information about dispatched actions and the resulting state changes.

### Parameters

- `store` (Object): The Redux store object.

### Returns

A function that takes a next function and returns a function that takes an action object.

## logSubscription

`logSubscription(store)` is a subscription function that logs information about state changes.

### Parameters

- `store` (Object): The Redux store object.

### Returns

A function that logs information about the current state of the store.

## Example Usage

```javascript
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
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
